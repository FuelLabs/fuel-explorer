'use client';

import { Providers } from 'app-portal/src/providers';
import { Bridge, BridgeHome } from 'app-portal/src/systems/Bridge/pages';

export function AppBridge() {
  return (
    <Providers>
      <BridgeHome>
        <Bridge />
      </BridgeHome>
    </Providers>
  );
}
