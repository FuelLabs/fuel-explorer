import { useNodeInfo } from '@fuel-wallet/react';
import { Heading, Tabs } from '@fuels/ui';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Layout.Content className={classes.content()}>
        <Heading as="h2" className={classes.heading()}>
          Fuel Native Bridge
        </Heading>
        <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
        <Tabs
          defaultValue={location.pathname.replace(/\/$/, '')}
          onValueChange={(path) => navigate(path)}
          variant="surface"
        >
          <Tabs.List className={classes.tabs()}>
            <Tabs.Trigger value={Pages.bridge}>Bridge</Tabs.Trigger>
            <Tabs.Trigger value={Pages.transactions}>History</Tabs.Trigger>
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
    tabs: 'ml-0',
  },
});
