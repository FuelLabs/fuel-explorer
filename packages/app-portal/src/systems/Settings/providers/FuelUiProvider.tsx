import { cssObj, globalCss } from '@fuel-ui/css';
import {
  ThemeProvider,
  darkTheme,
  lightTheme,
  loadIcons,
  setFuelThemes,
} from '@fuel-ui/react';
import type { PropsWithChildren } from 'react';

const globalStyles = cssObj({
  ':root': {
    '--colors-inputBaseBg': 'var(--colors-dialogBg)',
    '--colors-cardBg': 'var(--colors-intentsBase1)',
  },
  'h2, h3, h4': {
    fontWeight: '$base',
  },
});

loadIcons('/icons/sprite.svg');
setFuelThemes({
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
});

export function FuelUiProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {globalCss(globalStyles)()}
      {children}
    </ThemeProvider>
  );
}
