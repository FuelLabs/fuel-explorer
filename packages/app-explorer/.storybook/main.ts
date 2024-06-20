import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    'storybook-addon-theme/register',
  ],
  staticDirs: ['../public'],
  core: {},
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen',
  },
  swc: (_config, _options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /url/ }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, '');
        switch (mod) {
          case 'net':
            resource.requeset = 'net';
            break;
          case 'util':
            resource.request = 'util';
            break;
          case 'path':
            resource.request = 'path';
            break;
          case 'http':
            resource.request = 'stream-http';
            break;
          case 'https':
            resource.request = 'https-browserify';
            break;
          case 'zlib':
            resource.request = 'browserify-zlib';
            break;
          case 'url':
            resource.request = 'url';
            break;
          case 'fs':
            resource.request = 'fs';
            break;
          case 'buffer':
            resource.request = 'buffer';
            break;
          case 'stream':
            resource.request = 'readable-stream';
            break;
          default:
            throw new Error(`Not found ${mod}`);
        }
      }),
    );

    return config;
  },
};

export default config;
