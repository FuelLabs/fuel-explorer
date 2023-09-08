import '../src/app/globals.css';
import React, { useEffect } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { themes } from '@storybook/theming';
import {
  darkTheme,
  lightTheme,
  loadIcons,
  setFuelThemes,
} from '@fuel-ui/react';

import { ThemeProvider, useFuelTheme } from '@fuel-ui/react';
import theme from './theme';

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
      order: ['Base', 'Form', 'Overlay', 'UI'],
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
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

loadIcons('/icons/sprite.svg');
setFuelThemes({
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
});

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
    <ThemeWrapper>
      <Story />
    </ThemeWrapper>
  ),
];
