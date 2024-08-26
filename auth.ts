import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { database } from '@/lib/database';
import { Role } from '@prisma/client';
import Resend from 'next-auth/providers/resend';

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/sign-in',
    error: '/error',
    verifyRequest: '/verify-request',
  },
  events: {
    async linkAccount({ user }) {
      await database.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider !== 'credential') {
        return true;
      }

      return true;
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await database.user.findUnique({ where: { id: token.sub } });

      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(database),
  session: { strategy: 'jwt' },
  providers: [
    Resend({
      from: 'onboarding@resend.dev',
    }),
    ...authConfig.providers,
  ],
});
