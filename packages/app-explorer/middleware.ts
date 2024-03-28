export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - ui (UI storybook)
     * - storybook (explorer storybook)
     * - portal-storybook (bridge storybook)
     */
    '/((ui|storybook).*)',
  ],
};
