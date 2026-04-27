import { createClient, type Client } from '@libsql/client';
import { getAllItems } from './roadmap-data';

let clientInstance: Client | null = null;
let initPromise: Promise<void> | null = null;

function requireEnv(name: 'TURSO_DATABASE_URL' | 'TURSO_AUTH_TOKEN'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Set it in .env.local or your deployment environment.`);
  }
  return value;
}

export function getDB(): Client {
  if (clientInstance) return clientInstance;

  clientInstance = createClient({
    url: requireEnv('TURSO_DATABASE_URL'),
    authToken: requireEnv('TURSO_AUTH_TOKEN'),
  });

  return clientInstance;
}

async function seedMissingItems(client: Client): Promise<void> {
  const itemIds = getAllItems().map((item) => item.id);
  const chunkSize = 100;

  for (let index = 0; index < itemIds.length; index += chunkSize) {
    const chunk = itemIds.slice(index, index + chunkSize);
    const placeholders = chunk.map(() => '(?, 0)').join(', ');
    await client.execute({
      sql: `INSERT OR IGNORE INTO progress (item_id, done) VALUES ${placeholders}`,
      args: chunk,
    });
  }
}

export async function ensureDatabaseInitialized(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const client = getDB();

    await client.execute(`
      CREATE TABLE IF NOT EXISTS progress (
        item_id TEXT PRIMARY KEY,
        done INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    await seedMissingItems(client);
  })();

  try {
    await initPromise;
  } catch (error) {
    initPromise = null;
    throw error;
  }
}

export async function getProgressMap(): Promise<Record<string, boolean>> {
  await ensureDatabaseInitialized();

  const db = getDB();
  const result = await db.execute('SELECT item_id, done FROM progress');
  const map: Record<string, boolean> = {};

  for (const row of result.rows) {
    map[String(row.item_id)] = Number(row.done) === 1;
  }

  return map;
}

export async function setItemDone(id: string, done: boolean): Promise<void> {
  await ensureDatabaseInitialized();

  const db = getDB();
  await db.execute({
    sql: `INSERT INTO progress (item_id, done, updated_at)
          VALUES (?, ?, datetime('now'))
          ON CONFLICT(item_id) DO UPDATE SET done = excluded.done, updated_at = excluded.updated_at`,
    args: [id, done ? 1 : 0],
  });
}

export async function resetAll(): Promise<void> {
  await ensureDatabaseInitialized();

  const db = getDB();
  await db.execute("UPDATE progress SET done = 0, updated_at = datetime('now')");
}

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await ensureDatabaseInitialized();
    await getDB().execute('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
