'use client';

import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';
import { Providers } from '~portal/providers';
import { Bridge, BridgeHome, BridgeTxList } from './pages';

export function BridgePage() {
  return (
    <Box.Flex justify="center">
      <BridgeHome>
        <Bridge />
      </BridgeHome>
    </Box.Flex>
  );
}

export function BridgeListPage() {
  return (
    <Box.Flex justify="center">
      <BridgeHome>
        <BridgeTxList />
      </BridgeHome>
    </Box.Flex>
  );
}
