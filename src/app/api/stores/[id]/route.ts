import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/src/lib/auth';

type Params = { params: { id: string } };

async function canAccess(userEmail: string, id: string, role: 'ADMIN' | 'STORE') {
  if (role === 'ADMIN') return true;
  const me = await prisma.user.findUnique({ where: { email: userEmail } });
  const store = await prisma.store.findUnique({ where: { id } });
  return store?.ownerId === me?.id;
}

export async function GET(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as any).role as 'ADMIN' | 'STORE';
  if (!(await canAccess(session.user.email!, params.id, role))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const store = await prisma.store.findUnique({ where: { id: params.id } });
  return NextResponse.json(store);
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as any).role as 'ADMIN' | 'STORE';
  if (!(await canAccess(session.user.email!, params.id, role))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const name = body?.name as string | undefined;
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  const store = await prisma.store.update({ where: { id: params.id }, data: { name } });
  return NextResponse.json(store);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const role = (session.user as any).role as 'ADMIN' | 'STORE';
  if (!(await canAccess(session.user.email!, params.id, role))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await prisma.store.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}





