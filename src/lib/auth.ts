import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { prisma } from './prisma';
import { compare } from 'bcryptjs';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: { label: 'Email', type: 'text' }, password: { label: 'Password', type: 'password' } },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email }, include: { stores: { take: 1, select: { id: true } } } });
        if (!user) return null;
        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;
        const storeId = user.stores[0]?.id ?? null;
        return { id: user.id, name: user.name ?? null, email: user.email, image: user.image ?? null, role: user.role, storeId } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.storeId = (user as any).storeId ?? null;
      }
      return token as any;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = (token as any).role;
        (session.user as any).storeId = (token as any).storeId ?? null;
      }
      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}
