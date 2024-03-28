import { redirects } from './src/redirects.mjs';

const externals = [
  'bcryptjs',
  'ws',
  'isomorphic-ws',
  'node-fetch',
  '@whatwg/node-fetch',
  'graphql',
  '@graphql-tools/delegate',
  '@graphql-tools/load',
  '@graphql-tools/schema',
  '@graphql-tools/stitch',
  '@graphql-tools/url-loader',
  '@graphql-tools/utils',
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@fuel-explorer/graphql', 'app-commons', 'app-portal'],
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: externals,
    missingSuspenseWithCSRBailout: false,
    esmExternals: true,
    typedRoutes: true,
  },
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - ui (UI storybook)
     * - storybook (explorer storybook)
     * - portal-storybook (bridge storybook)
     */
    "/((?!ui|storybook|portal-storybook).*)",
  ],
  /** We run eslint as a separate task in CI */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  redirects: async () => {
    return [
      {
        source: '/portal-storybook',
        destination: '/portal-storybook/index.html',
        permanent: false,
      },
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
      ...redirects,
    ];
  },
  webpack: (config) => {
    config.externals.push(
      {
        'utf-8-validate': 'commonjs utf-8-validate',
        bufferutil: 'commonjs bufferutil',
        encoding: 'commonjs encoding',
        module: 'commonjs module',
      },
      // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
      'pino-pretty',
      'net',
      'tls',
    );

    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              exportType: 'named',
            },
          },
        ],
      },
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default config;
