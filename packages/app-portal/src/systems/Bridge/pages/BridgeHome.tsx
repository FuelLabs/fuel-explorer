import { useNodeInfo } from '@fuels/react';
import { Box, Button } from '@fuels/ui';
import { IconArrowBack, IconHistory } from '@tabler/icons-react';
import { FUEL_VERSION, PageTitle } from 'app-commons';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { Routes } from '~portal/routes';
import { FuelVersionDialog } from '~portal/systems/Chains/fuel/containers/FuelVersionDialog';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const classes = styles();
  const { isCompatible } = useNodeInfo({ version: FUEL_VERSION });
  const pathname = usePathname();
  const isBridgeHistory = pathname === Routes.bridgeHistory();

  return (
    <Box className={classes.content()}>
      <PageTitle title="Fuel Bridge">
        {isBridgeHistory ? (
          <Button
            as={NextLink}
            prefetch
            href={Routes.bridge()}
            size="1"
            color="gray"
            variant="ghost"
            leftIcon={IconArrowBack}
            className="rounded-md"
            aria-label="Back to home"
          >
            Back
          </Button>
        ) : (
          <Button
            as={NextLink}
            prefetch
            href={Routes.bridgeHistory()}
            size="1"
            color="gray"
            variant="ghost"
            leftIcon={IconHistory}
            className="rounded-md"
            aria-label="Transaction History"
          >
            History
          </Button>
        )}
      </PageTitle>
      <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
      {children}
    </Box>
  );
};

const styles = tv({
  slots: {
    content: 'w-full max-w-[455px]',
    tabs: 'ml-0 color-inherit decoration-none :active:text-success',
    toggle: [
      'w-full mb-4 rounded-md fuel-[ToggleGroupItem]:h-9',
      'fuel-[ToggleGroupItem]:text-md',
    ],
  },
});
