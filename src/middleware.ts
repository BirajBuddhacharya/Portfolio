import { NextResponse, type NextRequest } from 'next/server';
import { TOKEN_COOKIE, isTokenExpired } from './lib/authToken';

// Runs before /admin is rendered: no token (or an expired one) → login page.
// The backend still validates the JWT on every API call; this is only the gate.
export function middleware(req: NextRequest) {
  if (isTokenExpired(req.cookies.get(TOKEN_COOKIE)?.value)) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = '';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// everything under /admin except the login page itself
export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
