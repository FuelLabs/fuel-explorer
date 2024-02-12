import { cssObj } from '@fuel-ui/css';
import { Heading, Tabs } from '@fuel-ui/react';
import { useNodeInfo } from '@fuel-wallet/react';
import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { VITE_FUEL_VERSION } from '~/config';
import { FuelVersionDialog } from '~/systems/Chains/fuel/containers/FuelVersionDialog';
import { Layout } from '~/systems/Core';
import { Pages } from '~/types';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const { isCompatible } = useNodeInfo({
    version: VITE_FUEL_VERSION,
  });
  const location = useLocation();

  return (
    <Layout>
      <Layout.Content css={styles.content}>
        <Heading as="h2" css={styles.heading}>
          Fuel Native Bridge
        </Heading>
        <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
        <Tabs defaultValue={location.pathname.replace(/\/$/, '')}>
          <Tabs.List css={styles.tabs}>
            <NavLink to={Pages.bridge}>
              <Tabs.Trigger value={Pages.bridge}>Bridge</Tabs.Trigger>
            </NavLink>
            <NavLink to={Pages.transactions}>
              <Tabs.Trigger value={Pages.transactions}>History</Tabs.Trigger>
            </NavLink>
          </Tabs.List>
          {children}
        </Tabs>
      </Layout.Content>
    </Layout>
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
