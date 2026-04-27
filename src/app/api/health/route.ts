import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const healthy = await checkDatabaseHealth();

  if (healthy) {
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }

  return NextResponse.json({ status: 'error' }, { status: 503 });
}
