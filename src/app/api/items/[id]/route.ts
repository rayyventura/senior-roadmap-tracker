import { NextRequest, NextResponse } from 'next/server';
import { setItemDone } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));
  const { done } = body as { done?: boolean };
  if (typeof done !== 'boolean') {
    return NextResponse.json(
      { error: 'Body must be { done: boolean }' },
      { status: 400 }
    );
  }
  await setItemDone(params.id, done);
  return NextResponse.json({ ok: true, id: params.id, done });
}
