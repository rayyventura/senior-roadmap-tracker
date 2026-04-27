import { NextResponse } from 'next/server';
import { resetAll } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  await resetAll();
  return NextResponse.json({ ok: true });
}
