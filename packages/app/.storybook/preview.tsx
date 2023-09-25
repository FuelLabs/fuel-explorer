import '@fontsource-variable/inter/slnt.css';
import '@fuels/ui/styles.css';
import '../src/app/globals.css';

import { withThemeDecorator } from 'storybook-addon-theme';
import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { Provider } from '../src/systems/Core/components/Provider';

const preview: Preview = {
  decorators: [withThemeDecorator(Provider)],

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
