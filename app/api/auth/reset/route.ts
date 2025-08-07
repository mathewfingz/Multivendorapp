import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { z } from 'zod';
import { hash } from 'bcryptjs';

const schema = z.object({ token: z.string().min(10), password: z.string().min(6) });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const { token, password } = parsed.data;
    const vt = await prisma.verificationToken.findUnique({ where: { token } });
    if (!vt || vt.expires < new Date()) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });

    const passwordHash = await hash(password, 10);
    await prisma.user.update({ where: { email: vt.identifier }, data: { passwordHash } });
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
