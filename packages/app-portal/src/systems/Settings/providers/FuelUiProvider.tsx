import { cssObj, globalCss } from '@fuel-ui/css';
import {
  Button,
  Dialog,
  Icon,
  Link,
  ThemeProvider,
  darkTheme,
  lightTheme,
  loadIcons,
  setFuelThemes,
} from '@fuel-ui/react';
import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line import/no-unresolved
import icons from '/icons/sprite.svg';

const globalStyles = cssObj({
  ':root': {
    '--colors-inputBaseBg': 'var(--colors-dialogBg)',
    '--colors-cardBg': 'var(--colors-intentsBase1)',
  },
  'h2, h3, h4': {
    fontWeight: '$base',
  },
});

loadIcons(icons);
setFuelThemes({
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
});

export function FuelUiProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useQuery(['network'], async () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const oldWindowFuel = (window as any).fuel as any;
    if (!oldWindowFuel) return;
    const { url } = await oldWindowFuel.network();
    return url;
  });

  return (
    <ThemeProvider>
      {!isLoading && data?.includes('beta-4') && (
        <Dialog isOpen css={styles.dialog}>
          <Dialog.Heading>
            <Icon icon="Warning" /> Wrong Wallet Version
          </Dialog.Heading>
          <Dialog.Content css={styles.content}>
            Your wallet version is impatible with this application. Please
            update your wallet for version 0.15.2.
            <Button
              as="a"
              size="sm"
              variant="solid"
              intent="primary"
              href="https://chromewebstore.google.com/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok"
              target="_blank"
              rel="noreferrer"
            >
              Update Wallet
            </Button>
          </Dialog.Content>
        </Dialog>
      )}

      {globalCss(globalStyles)()}
      {children}
    </ThemeProvider>
  );
}

const OVERLAY_HEIGHT = 100;
const OVERLAY_WIDTH = 300;

const styles = {
  dialog: cssObj({
    backdropFilter: 'blur(10px)',
  }),
  content: cssObj({
    width: OVERLAY_WIDTH,
    minHeight: OVERLAY_HEIGHT,
    maxWidth: OVERLAY_WIDTH,
    maxHeight: 'none',
    backgroundColor: '$cardBg',
    textAlign: 'center',
  }),
};
