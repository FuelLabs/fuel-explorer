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
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
