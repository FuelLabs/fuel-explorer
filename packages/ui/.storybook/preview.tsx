import '@fontsource-variable/inter/slnt.css';
import '../src/theme/index.css';

import { withThemeDecorator } from 'storybook-addon-theme';
import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Theme } from '../src/components/Theme';
import { Toaster } from '../src/components/Toast';
import { ReactNode } from 'react';

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
