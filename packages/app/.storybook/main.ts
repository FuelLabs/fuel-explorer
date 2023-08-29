import tsconfigpath from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { join } from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.tsx'],
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
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config: any) {
    console.log(config.base);
    return mergeConfig(config, {
      base: process.env.NODE_ENV === 'development' ? config.base : '/storybook',
      plugins: [
        tsconfigpath(),
        viteStaticCopy({
          targets: [
            {
              src: config.build.outDir,
              dest: join(__dirname, '../public'),
              rename: 'storybook',
            },
          ],
        }),
      ],
      define: {
        __STORYBOOK_FUEL_UI__: '"true"',
      },
    });
  },
};
export default config;
