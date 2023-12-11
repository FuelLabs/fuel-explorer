import { redirects } from './src/routes.mjs';
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
  transpilePackages: ['@fuel-explorer/graphql'],
  experimental: {
    externalDir: true,
    serverComponentsExternalPackages: externals,
    esmExternals: true,
  },
  /** We run eslint as a separate task in CI */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
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
      ...redirects,
    ];
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
      encoding: 'commonjs encoding',
      module: 'commonjs module',
    });
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
