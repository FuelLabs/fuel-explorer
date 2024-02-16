import { cssObj } from '@fuel-ui/css';
import { Box, Heading, Tabs } from '@fuel-ui/react';
import { useNodeInfo } from '@fuel-wallet/react';
import type { ReactNode } from 'react';
import { VITE_FUEL_VERSION } from '~portal/config';
import { FuelVersionDialog } from '~portal/systems/Chains/fuel/containers/FuelVersionDialog';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const { isCompatible } = useNodeInfo({
    version: VITE_FUEL_VERSION,
  });

  return (
    <Box css={styles.content}>
      <Heading as="h2" css={styles.heading}>
        Fuel Native Bridge
      </Heading>
      <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
      <Tabs defaultValue={location.pathname.replace(/\/$/, '')}>
        <Tabs.List css={styles.tabs}>
          <Tabs.Trigger value={'bridge'}>Bridge</Tabs.Trigger>
          <Tabs.Trigger value={'transactions'}>History</Tabs.Trigger>
        </Tabs.List>
        {children}
      </Tabs>
    </Box>
  );
};

const styles = {
  content: cssObj({
    maxWidth: '$sm',
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
