import { Flex } from '@fuels/ui';
import { useLocation } from 'react-router-dom';
import { BridgeViews } from '~/systems/Bridge/components/BridgeViews';
import { Bridge, BridgeHome, BridgeTxList } from '~portal/systems/Bridge/pages';
import { isBridgeHistory } from '~portal/systems/Bridge/utils/isBridgeHistory';

// One panel for both routes, so the header persists and the views can
// animate into each other instead of remounting.
export default function BridgePanelPage() {
  const { pathname } = useLocation();
  const view = isBridgeHistory(pathname) ? 'history' : 'form';

  return (
    <Flex align="center" direction="column" className="min-h-0 flex-1">
      <BridgeHome>
        <BridgeViews view={view} form={<Bridge />} history={<BridgeTxList />} />
      </BridgeHome>
    </Flex>
  );
}
