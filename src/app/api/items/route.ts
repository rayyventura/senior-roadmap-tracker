import { NextResponse } from 'next/server';
import { getProgressMap } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const progress = await getProgressMap();
  return NextResponse.json({ progress });
}
