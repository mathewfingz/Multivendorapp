import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { name, email, password } = parsed.data;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    const passwordHash = await hash(password, 10);
    await prisma.user.create({ data: { name, email, passwordHash, role: 'STORE' } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
