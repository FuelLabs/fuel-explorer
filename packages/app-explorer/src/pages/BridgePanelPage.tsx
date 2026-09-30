import { Flex } from '@fuels/ui';
import { Routes } from 'app-commons';
import { useLocation } from 'react-router-dom';
import { BridgeViews } from '~/systems/Bridge/components/BridgeViews';
import { useReportWithdrawDelay } from '~/systems/Bridge/withdrawDelay';
import { useWithdrawDelay } from '~portal/systems/Bridge/hooks/useWithdrawDelay';
import { Bridge, BridgeHome, BridgeTxList } from '~portal/systems/Bridge/pages';

// One panel for both routes, so the header persists and the views can
// animate into each other instead of remounting.
export default function BridgePanelPage() {
  const { timeToWithdrawFormatted } = useWithdrawDelay();
  useReportWithdrawDelay(timeToWithdrawFormatted ?? '');
  const { pathname } = useLocation();
  const view = pathname.startsWith(Routes.bridgeHistory()) ? 'history' : 'form';

  return (
    <Flex align="center" direction="column" className="min-h-0 flex-1">
      <BridgeHome>
        <BridgeViews view={view} form={<Bridge />} history={<BridgeTxList />} />
      </BridgeHome>
    </Flex>
  );
}
