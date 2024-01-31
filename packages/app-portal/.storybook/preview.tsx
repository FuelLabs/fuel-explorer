import React, { useEffect } from 'react';
import { darkTheme, lightTheme } from '@fuel-ui/react';
import { themes } from '@storybook/theming';

import theme from './theme';
import { useFuelTheme, ThemeProvider } from '@fuel-ui/react';
import { useDarkMode } from 'storybook-dark-mode';
import { StoreProvider } from '../src/systems/Store';

export const parameters = {
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
      method: 'alphabetical',
    },
  },
  darkMode: {
    stylePreview: true,
    dark: {
      ...themes.dark,
      ...theme,
      appBg: '#101010',
      barBg: '#151515',
    },
    light: {
      ...themes.light,
      ...theme,
    },
    darkClass: darkTheme.theme.className,
    lightClass: lightTheme.theme.className,
  },
};

function ThemeWrapper(props: any) {
  const isDark = useDarkMode();
  const { setTheme } = useFuelTheme();

  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  return <ThemeProvider>{props.children}</ThemeProvider>;
}

export const decorators = [
  (Story: any) => (
    <StoreProvider>
      <ThemeWrapper>
        <Story />
      </ThemeWrapper>
    </StoreProvider>
  ),
];
