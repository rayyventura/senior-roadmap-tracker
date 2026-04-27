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

    await client.execute(`
      CREATE TABLE IF NOT EXISTS resources (
        id TEXT PRIMARY KEY,
        item_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT,
        file_data TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (item_id) REFERENCES progress(item_id)
      )
    `);

    await client.execute(`
      CREATE INDEX IF NOT EXISTS idx_resources_item_id ON resources(item_id)
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

export type Resource = {
  id: string;
  item_id: string;
  type: 'link' | 'file';
  title: string;
  url?: string;
  file_data?: string;
  created_at: string;
};

export async function getResourcesForItem(itemId: string): Promise<Resource[]> {
  await ensureDatabaseInitialized();
  const db = getDB();
  
  const result = await db.execute({
    sql: 'SELECT id, item_id, type, title, url, file_data, created_at FROM resources WHERE item_id = ? ORDER BY created_at DESC',
    args: [itemId],
  });

  return result.rows.map((row) => ({
    id: String(row.id),
    item_id: String(row.item_id),
    type: String(row.type) as 'link' | 'file',
    title: String(row.title),
    url: row.url ? String(row.url) : undefined,
    file_data: row.file_data ? String(row.file_data) : undefined,
    created_at: String(row.created_at),
  }));
}

export async function addResource(
  itemId: string,
  type: 'link' | 'file',
  title: string,
  url?: string,
  fileData?: string
): Promise<Resource> {
  await ensureDatabaseInitialized();
  const db = getDB();
  const id = `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  await db.execute({
    sql: `INSERT INTO resources (id, item_id, type, title, url, file_data)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [id, itemId, type, title, url || null, fileData || null],
  });

  return {
    id,
    item_id: itemId,
    type,
    title,
    url,
    file_data: fileData,
    created_at: new Date().toISOString(),
  };
}

export async function deleteResource(resourceId: string): Promise<void> {
  await ensureDatabaseInitialized();
  const db = getDB();
  
  await db.execute({
    sql: 'DELETE FROM resources WHERE id = ?',
    args: [resourceId],
  });
}
