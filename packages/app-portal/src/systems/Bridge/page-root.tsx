import { Flex } from '@fuels/ui';
import { Bridge, BridgeHome } from './pages';

export function BridgePage() {
  return (
    <Flex align="center" direction="column">
      <BridgeHome>
        <Bridge />
      </BridgeHome>
    </Flex>
  );
}
