import type { FuelCoreClient } from '../fuelcore/FuelCoreClient';
import type { PriceClient } from '../fuelcore/PriceClient';
import type { FallbackHeights } from '../hot/FallbackHeights';
import type { HotKeys } from '../hot/HotKeys';
import type { Index } from '../index/Index';
import type { TipTracker } from '../index/TipTracker';
import type { BlockStore } from '../store/BlockStore';

export type AppContext = {
  store: BlockStore;
  index: Index;
  tip: TipTracker;
  client: FuelCoreClient;
  chain: { chainId: number; baseAssetId: string };
  price: PriceClient;
  hot: HotKeys;
  // Optional so test contexts can omit it.
  fallbackHeights?: FallbackHeights;
};
