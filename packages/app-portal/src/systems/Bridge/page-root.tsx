import { Flex } from '@fuels/ui';
import { Bridge, BridgeHome } from './pages';

export function BridgePage() {
  return (
    <Flex justify="center">
      <BridgeHome>
        <Bridge />
      </BridgeHome>
    </Flex>
  );
}
