import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_REDIRECT,
  publicRoutes,
} from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn: boolean = !!req.auth;

  const isPublicRoutes: boolean = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes: boolean = authRoutes.includes(nextUrl.pathname);
  const isApiAuthPrefix: boolean = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthPrefix) {
    return;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
