import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/src/lib/auth';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const storeId = (session.user as any).storeId as string | null;
  if (!storeId) return NextResponse.json({ items: [] });
  const items = await prisma.product.findMany({ where: { storeId }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const storeId = (session.user as any).storeId as string | null;
  if (!storeId) return NextResponse.json({ error: 'No store' }, { status: 400 });

  const json = await req.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const product = await prisma.product.create({ data: { name: parsed.data.name, storeId } });
  return NextResponse.json({ product }, { status: 201 });
}


