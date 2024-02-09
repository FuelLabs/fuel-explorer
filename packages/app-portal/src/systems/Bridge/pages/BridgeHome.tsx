import { useNodeInfo } from '@fuel-wallet/react';
import { Heading, Tabs } from '@fuels/ui';
import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { VITE_FUEL_VERSION } from '~/config';
import { FuelVersionDialog } from '~/systems/Chains/fuel/containers/FuelVersionDialog';
import { Layout } from '~/systems/Core';
import { Pages } from '~/types';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const classes = styles();
  const { isCompatible } = useNodeInfo({
    version: VITE_FUEL_VERSION,
  });
  const location = useLocation();

  return (
    <Layout>
      <Layout.Content className={classes.content()}>
        <Heading as="h2" className={classes.heading()}>
          Fuel Native Bridge
        </Heading>
        <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
        <Tabs defaultValue={location.pathname.replace(/\/$/, '')}>
          <Tabs.List className={classes.tabs()}>
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

const styles = tv({
  slots: {
    content: 'max-w-[455px]',
    heading: 'mt-0 mb-4 ml-[-2px]',
    tabs: 'ml-0 color-inherit decoration-none :active:text-success',
  },
});
