/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: ['bcryptjs'],
    serverActions: true,
  },
  /** We run eslint as a separate task in CI */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  rewrites: async () => {
    // This is as proxy route to enable next.js
    // to proxy requests to the graphql server on
    // preview environment.
    return process.env.IS_PREVIEW
      ? [
          {
            source: '/graphql',
            destination: process.env.GRAPHQL_API,
          },
        ]
      : [];
  },
  redirects: async () => {
    return [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
        permanent: false,
      },
      {
        source: '/ui',
        destination: '/ui/index.html',
        permanent: false,
      },
    ];
  },
};

export default config;
