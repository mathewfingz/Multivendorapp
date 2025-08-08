import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/src/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if ((session.user as any).role === 'ADMIN') {
    const stores = await prisma.store.findMany({ include: { owner: { select: { email: true, name: true } } }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(stores);
  }
  const me = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const stores = await prisma.store.findMany({ where: { ownerId: me!.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(stores);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const name = body?.name as string | undefined;
  const ownerEmail = body?.ownerEmail as string | undefined;
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  let ownerId: string | undefined;
  if ((session.user as any).role === 'ADMIN' && ownerEmail) {
    const owner = await prisma.user.findUnique({ where: { email: ownerEmail } });
    if (!owner) return NextResponse.json({ error: 'Owner not found' }, { status: 404 });
    ownerId = owner.id;
  } else {
    const me = await prisma.user.findUnique({ where: { email: session.user.email! } });
    ownerId = me!.id;
  }

  const store = await prisma.store.create({ data: { name, ownerId: ownerId! } });
  return NextResponse.json(store, { status: 201 });
}




