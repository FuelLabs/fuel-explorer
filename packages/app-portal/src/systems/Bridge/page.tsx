'use client';

import { Flex } from '@fuels/ui';
import { Bridge, BridgeHome, BridgeTxList } from './pages';

export function BridgePage() {
  return (
    <Flex justify="center">
      <BridgeHome>
        <Bridge />
      </BridgeHome>
    </Flex>
  );
}

export function BridgeListPage() {
  return (
    <Flex justify="center">
      <BridgeHome>
        <BridgeTxList />
      </BridgeHome>
    </Flex>
  );
}
