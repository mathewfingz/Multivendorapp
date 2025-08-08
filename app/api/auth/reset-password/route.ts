import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { z } from 'zod';
import { createHash } from 'crypto';
import { jwtVerify } from 'jose';
import { hash } from 'bcryptjs';

const schema = z.object({ token: z.string().min(10), password: z.string().min(6) });

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const { token, password } = parsed.data;
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'secret');
  try {
    const { payload } = await jwtVerify(token, secret);
    const uid = payload.uid as string;
    const hashToken = createHash('sha256').update(token).digest('hex');
    const record = await prisma.passwordReset.findFirst({ where: { userId: uid, tokenHash: hashToken } });
    if (!record || record.expires < new Date()) return NextResponse.json({ error: 'Invalid or expired' }, { status: 400 });

    const passwordHash = await hash(password, 10);
    await prisma.user.update({ where: { id: uid }, data: { passwordHash } });
    await prisma.passwordReset.delete({ where: { id: record.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }
}



