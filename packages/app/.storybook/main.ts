import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    './addon-theme/register.tsx',
  ],
  staticDirs: ['../public'],
  core: {},
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
