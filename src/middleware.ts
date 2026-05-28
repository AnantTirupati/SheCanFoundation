import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const pathname = req.nextUrl.pathname;
      
      // Exclude the login route itself from session checks to prevent redirect loops
      if (pathname === '/dashboard/login') {
        return true;
      }
      
      // Allow access to all other /dashboard routes ONLY if the token is present and the role is ADMIN
      return token?.role === 'ADMIN';
    },
  },
  pages: {
    signIn: '/dashboard/login',
  },
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
