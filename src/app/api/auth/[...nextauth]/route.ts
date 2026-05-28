import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@shecanfoundation.org';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (credentials?.email === adminEmail && credentials?.password === adminPassword) {
          return {
            id: 'admin-1',
            name: 'She Can Admin',
            email: adminEmail,
            role: 'ADMIN',
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/dashboard/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'secret123',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
