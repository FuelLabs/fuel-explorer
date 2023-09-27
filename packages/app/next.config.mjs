/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@fuel-explorer/graphql'],
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: [
      'bcryptjs',
      '@graphql-tools/delegate',
      '@graphql-tools/load',
      '@graphql-tools/schema',
      '@graphql-tools/stitch',
      '@graphql-tools/url-loader',
      '@graphql-tools/utils',
    ],
    serverActions: true,
    esmExternals: true,
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
            destination: '/api/graphql',
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
};

export default config;
