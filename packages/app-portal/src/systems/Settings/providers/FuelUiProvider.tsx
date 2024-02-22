import { cssObj, globalCss } from '@fuel-ui/css';
import {
  Box,
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
import { PropsWithChildren, useState } from 'react';

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
  const [founded, setFounded] = useState(false);
  const { data: isOldWallet, isLoading } = useQuery(
    ['network'],
    async () => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const oldWindowFuel = (window as any).fuel as any;
      if (!oldWindowFuel && !founded) {
        throw new Error('No Fuel Wallet found');
      }
      if (!oldWindowFuel && founded) {
        setFounded(true);
        return;
      }
      const version = window.fuel?.connectorName;
      return Boolean(version);
    },
    {
      retry: 5,
      retryDelay: 1000,
    },
  );

  return (
    <ThemeProvider>
      {!isLoading && isOldWallet && (
        <Box css={styles.dialog}>
          <Box css={styles.content}>
            Your wallet version is incompatible with this application. Please
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
          </Box>
        </Box>
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
    zIndex: 1,
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(15px)',
  }),
  content: cssObj({
    borderRadius: '$md',
    padding: '$4',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    width: OVERLAY_WIDTH,
    minHeight: OVERLAY_HEIGHT,
    maxWidth: OVERLAY_WIDTH,
    maxHeight: 'none',
    backgroundColor: '$cardBg',
    textAlign: 'center',
    boxShadow: '$md',
  }),
};
