import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    // TODO: add both after get this issue fixed: https://github.com/storybookjs/storybook/issues/24275
    // '@storybook/addon-a11y',
    // 'storybook-addon-theme/register',
  ],
  staticDirs: ['../public'],
  core: {},
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
