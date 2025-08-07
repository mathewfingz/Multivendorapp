import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { z } from 'zod';
import { createHash } from 'crypto';
import { SignJWT } from 'jose';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ ok: true });

  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'secret');
  const token = await new SignJWT({ uid: user.id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('30m').sign(secret);
  const hash = createHash('sha256').update(token).digest('hex');
  await prisma.passwordReset.create({ data: { userId: user.id, identifier: email, tokenHash: hash, expires: new Date(Date.now() + 30*60*1000) } });

  console.log(`[RESET] /auth/reset-password?token=${token}`);
  return NextResponse.json({ ok: true });
}
