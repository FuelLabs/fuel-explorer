import '@fuels/ui/styles.css';
import '../src/app/globals.css';
import './fonts.css';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import { withThemeDecorator } from 'storybook-addon-theme';

import type { ReactNode } from 'react';
import { ThemeProvider } from '../src/systems/Core/components/Theme';

function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
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
