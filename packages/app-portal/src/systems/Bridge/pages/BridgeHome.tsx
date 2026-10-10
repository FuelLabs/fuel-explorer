import { Box } from '@fuels/ui';
import { BridgePausedBanner, PageTitle } from 'app-commons';

import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { BridgeHistoryToggle } from '../components/BridgeHistoryToggle/BridgeHistoryToggle';
import { LayerSwapBanner } from '../components/LayerSwapBanner/LayerSwapBanner';
import { BridgeTabs } from '../containers/BridgeTabs';
import { isBridgeHistory as isHistoryPath } from '../utils/isBridgeHistory';

type BridgeHomeProps = {
  children: ReactNode;
};

// The form needs no title: Deposit and Withdraw already name it, and History
// sits beside them. History keeps a title so the list is labelled.
export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const { t } = useTranslation();
  const classes = styles();
  const location = useLocation();
  const isBridgeHistory = isHistoryPath(location.pathname);

  return (
    <Box className={classes.content()}>
      <BridgePausedBanner />
      <LayerSwapBanner />
      {isBridgeHistory ? (
        <PageTitle as="h2" title={t('portal.bridge.history')} mb="4">
          <BridgeHistoryToggle />
        </PageTitle>
      ) : (
        <div className={classes.bar()}>
          <div className="min-w-0 flex-1">
            <BridgeTabs />
          </div>
          <BridgeHistoryToggle />
        </div>
      )}
      {children}
    </Box>
  );
};

const styles = tv({
  slots: {
    content: 'flex w-full max-w-[520px] min-h-0 flex-1 flex-col',
    bar: 'mb-4 flex items-center gap-2',
  },
});
