import '@fontsource-variable/inter/slnt.css';
import '../src/theme/index.css';

import { withThemeDecorator } from './addon-theme/decorator';
import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  decorators: [withThemeDecorator],

  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Base', 'Layout', 'Form', 'Overlay', 'UI', 'Helpers', 'Web3'],
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
