import { cssObj } from '@fuel-ui/css';
import { Box, Heading, Tabs } from '@fuel-ui/react';
import { useNodeInfo } from '@fuel-wallet/react';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { VITE_FUEL_VERSION } from '~portal/config';
import { Routes } from '~portal/routes';
import { FuelVersionDialog } from '~portal/systems/Chains/fuel/containers/FuelVersionDialog';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const { isCompatible } = useNodeInfo({
    version: VITE_FUEL_VERSION,
  });
  const pathname = usePathname();

  return (
    <Box css={styles.content}>
      <Heading as="h2" css={styles.heading}>
        Fuel Native Bridge
      </Heading>
      <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
      <Tabs defaultValue={pathname}>
        <Tabs.List css={styles.tabs}>
          <NextLink href={Routes.bridge()}>
            <Tabs.Trigger value={Routes.bridge()}>Bridge</Tabs.Trigger>
          </NextLink>
          <NextLink href={Routes.bridgeHistory()}>
            <Tabs.Trigger value={Routes.bridgeHistory()}>History</Tabs.Trigger>
          </NextLink>
        </Tabs.List>
        {children}
      </Tabs>
    </Box>
  );
};

const styles = {
  content: cssObj({
    maxWidth: '$sm',
    with: 400,
  }),
  heading: cssObj({
    mt: 0,
    mb: '$4',
    // Align title with the content of the page
    ml: -2,
  }),
  tabs: cssObj({
    ml: 0,
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'a.active': {
      color: '$accent9',
    },
  }),
  buttonNavLink: cssObj({
    '&:hover': {
      textDecoration: 'none',
    },
  }),
};
