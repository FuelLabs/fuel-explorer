import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/transactions?page=1', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
};
