import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/dashboard',
    error: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son obligatorios');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
          include: { organization: true },
        });

        if (!user || !user.passwordHash) {
          throw new Error('Credenciales incorrectas');
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error('Credenciales incorrectas');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          plan: user.plan,
          company: user.organization?.name ?? user.company,
          organizationId: user.organizationId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as {
          id: string;
          role: string;
          plan: string;
          company: string | null;
          organizationId: string | null;
        };
        token.id = u.id;
        token.role = u.role;
        token.plan = u.plan;
        token.company = u.company;
        token.organizationId = u.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.plan = token.plan;
        session.user.company = token.company;
        session.user.organizationId = token.organizationId;
      }
      return session;
    },
  },
};
