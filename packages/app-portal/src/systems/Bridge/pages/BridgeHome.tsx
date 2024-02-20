import { useNodeInfo } from '@fuel-wallet/react';
import { Box, Heading, Tabs } from '@fuels/ui';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { VITE_FUEL_VERSION } from '~portal/config';
import { Routes } from '~portal/routes';
import { FuelVersionDialog } from '~portal/systems/Chains/fuel/containers/FuelVersionDialog';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const classes = styles();
  const { isCompatible } = useNodeInfo({
    version: VITE_FUEL_VERSION,
  });
  const pathname = usePathname();

  return (
    <Box className={classes.content()}>
      <Heading as="h2" className={classes.heading()}>
        Fuel Native Bridge
      </Heading>
      <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
      <Tabs defaultValue={pathname}>
        <Tabs.List className={classes.tabs()}>
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

const styles = tv({
  slots: {
    content: 'max-w-[455px]',
    heading: 'mt-0 mb-4 ml-[-2px]',
    tabs: 'ml-0 color-inherit decoration-none :active:text-success',
  },
});
