import { Box, Button } from '@fuels/ui';
import { IconArrowBack, IconHistory } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { Routes } from 'app-commons';

import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { LayerSwapBanner } from '../components/LayerSwapBanner/LayerSwapBanner';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const classes = styles();
  const location = useLocation();

  // Determine if we're on the bridge history page
  const isBridgeHistory = location.pathname === Routes.bridgeHistory();

  return (
    <Box className={classes.content()}>
      <LayerSwapBanner />
      <PageTitle title="Fuel Bridge">
        {isBridgeHistory ? (
          <Button
            as="a"
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
            as="a"
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
