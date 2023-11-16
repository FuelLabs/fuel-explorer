import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/transactions?page=1', request.url));
  }
  if (pathname.startsWith('/account')) {
    const id = pathname.split('/')?.[2] ?? null;
    if (pathname === `/account/${id}`) {
      return NextResponse.redirect(
        new URL(`/account/${id}/assets`, request.url),
      );
    }
    return NextResponse.next();
  }
  if (pathname.startsWith('/contract')) {
    const id = pathname.split('/')?.[2] ?? null;
    if (pathname === `/contract/${id}`) {
      return NextResponse.redirect(
        new URL(`/contract/${id}/assets`, request.url),
      );
    }
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/account/:path*', '/contract/:path*'],
};
