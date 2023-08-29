import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    'storybook-dark-mode',
  ],
  staticDirs: ['../public'],
  core: {},
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      return {
        ...config,
        output: {
          ...config.output,
          publicPath: '/storybook/',
        },
      };
    }
    return config;
  },
};

export default config;
