/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['bcryptjs'],
    serverActions: true,
  },
  /** We run eslint as a separate task in CI */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  // This is as proxy route to enable next.js
  // to proxy requests to the graphql server
  rewrites: async () => {
    return [
      {
        source: '/graphql',
        destination: process.env.GRAPHQL_API || 'http://localhost:4444/graphql',
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
        permanent: false,
      },
    ];
  },
};

export default config;
