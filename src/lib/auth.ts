import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Demo mode: no database required — hardcoded credentials for UI preview
const DEMO_USERS = [
  {
    id: 'demo-admin',
    email: 'admin@vehiqcentral.es',
    password: 'Vehiq2024!',
    name: 'Admin Demo',
    role: 'ADMIN',
    plan: 'ENTERPRISE',
    company: 'VehiqCentral',
    organizationId: 'demo-org',
    image: null,
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    newUser: '/dashboard',
    error: '/login',
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

        const user = DEMO_USERS.find(
          (u) =>
            u.email === credentials.email.toLowerCase().trim() &&
            u.password === credentials.password
        );

        if (!user) {
          throw new Error('Credenciales incorrectas');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          plan: user.plan,
          company: user.company,
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
