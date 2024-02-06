import '../src/theme/fonts.css';
import '../src/theme/index.css';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Preview } from '@storybook/react';
import React, { ReactNode } from 'react';
import { withThemeDecorator } from 'storybook-addon-theme';
import { Theme } from '../src/components/Theme';
import { Toaster } from '../src/components/Toast';

function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <Theme>
      <Toaster />
      {children}
    </Theme>
  );
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
