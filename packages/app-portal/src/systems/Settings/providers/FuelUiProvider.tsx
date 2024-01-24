import {
  darkTheme,
  lightTheme,
  loadIcons,
  setFuelThemes,
  ThemeProvider,
} from '@fuel-ui/react';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line import/no-unresolved
import icons from '/icons/sprite.svg';

loadIcons(icons);
setFuelThemes({
  initial: 'light',
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
});

export function FuelUiProvider({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
