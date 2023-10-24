import '@fontsource-variable/inter/slnt.css';
import '../src/app/globals.css';

import React from 'react';
import { withThemeDecorator } from 'storybook-addon-theme';
import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { Provider } from '../src/systems/Core/components/Provider';
import { ReactNode } from 'react';

function ThemeWrapper({ children }: { children: ReactNode }) {
  const initTheme = localStorage.getItem('fuel-ui-theme') ?? 'dark';
  return <Provider theme={initTheme}>{children}</Provider>;
}

const preview: Preview = {
  decorators: [withThemeDecorator(ThemeWrapper)],

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
