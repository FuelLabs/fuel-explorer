import { Flex } from '@fuels/ui';
import { BridgeHome, BridgeTxList } from './pages';

export function BridgeHistoryPage() {
  return (
    <Flex justify="center">
      <BridgeHome>
        <BridgeTxList />
      </BridgeHome>
    </Flex>
  );
}
