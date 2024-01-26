import tsconfigpath from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import { join } from 'node:path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../sdk-react/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    'storybook-dark-mode',
    'storybook-addon-react-router-v6',
  ],
  env: (config) => {
    // Filter out all env variables
    // This was causing a issue were envs
    // were been loaded as JSON strings
    // and causing storybook to not work
    return {
      NODE_ENV: config.NODE_ENV,
      NODE_PATH: config.NODE_PATH,
      STORYBOOK: config.STORYBOOK,
    };
  },
  staticDirs: ['../public'],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config: any) {
    return mergeConfig(config, {
      base: join(process.env.STORYBOOK_BASE_URL || config.base || ''),
      plugins: [tsconfigpath()],
      resolve: {
        alias: {
          '/icons/sprite.svg': '/public/icons/sprite.svg',
        },
      },
    });
  },
};

export default config;
