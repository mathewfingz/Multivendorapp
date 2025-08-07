import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/src/lib/auth';

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(()=>({}));
  const name = body?.name as string | undefined;
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  await prisma.user.update({ where: { email: session.user.email }, data: { name } });
  return NextResponse.json({ ok: true });
}

