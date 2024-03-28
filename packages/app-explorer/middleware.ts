import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - ui (UI storybook)
     * - storybook (explorer storybook)
     * - portal-storybook (bridge storybook)
     */
    '/((?!ui|storybook).*)',
  ],
};
