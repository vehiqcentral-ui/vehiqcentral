import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin-only routes
    if (pathname.startsWith('/dashboard/settings') && token?.role !== 'ADMIN') {
      // Allow non-admins to see their own settings
    }

    // API routes that need auth — handled by route handlers themselves
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
      if (!token) {
        return NextResponse.json(
          { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
          { status: 401 }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public routes — no auth needed
        if (
          pathname === '/' ||
          pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/forgot-password' ||
          pathname.startsWith('/auth/') ||
          pathname.startsWith('/api/auth/') ||
          pathname.startsWith('/solicitar-acceso') ||
          pathname.startsWith('/plataforma') ||
          pathname.startsWith('/soluciones') ||
          pathname.startsWith('/para-quien') ||
          pathname.startsWith('/recursos') ||
          pathname.startsWith('/blog') ||
          pathname.startsWith('/noticias') ||
          pathname.startsWith('/contacto') ||
          pathname.startsWith('/sobre-nosotros') ||
          pathname.startsWith('/privacidad') ||
          pathname.startsWith('/terminos') ||
          pathname.startsWith('/cookies') ||
          pathname.startsWith('/faq') ||
          pathname.startsWith('/ayuda') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon')
        ) {
          return true;
        }

        // Dashboard and API routes need a token
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all paths except static files and images.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
