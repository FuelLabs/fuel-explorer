import type { StorybookConfig } from '@storybook/nextjs';

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
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /url/ }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default config;
