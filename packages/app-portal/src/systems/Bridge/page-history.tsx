'use client';

import { Flex } from '@fuels/ui';
import { BridgeHome, BridgeTxList } from './pages';

export default function BridgeListPage() {
  return (
    <Flex justify="center">
      <BridgeHome>
        <BridgeTxList />
      </BridgeHome>
    </Flex>
  );
}
