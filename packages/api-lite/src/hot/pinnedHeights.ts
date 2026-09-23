import type { Index } from '../index/Index';
import type { FallbackHeights } from './FallbackHeights';
import type { HotKeys } from './HotKeys';

const PINNED_RECOMPUTE_INTERVAL_MS = 60 * 1000;
const PINNED_TOP_ACCOUNTS = 50;
const PINNED_TOP_TXS = 200;
const PINNED_ACCOUNT_TX_LIMIT = 10;

// Block heights the disk cache must not evict. Recomputed on an interval
// because HotKeys.top() and the index scans are too slow to run per eviction.
export function makePinnedHeights(
  hot: Pick<HotKeys, 'top'>,
  index: Pick<Index, 'txsForAccount' | 'heightForTx'>,
  fallback: Pick<FallbackHeights, 'heightsFor'>,
  now: () => number = Date.now,
): () => Set<number> {
  let cached = new Set<number>();
  let computedAt = Number.NEGATIVE_INFINITY;
  return () => {
    const t = now();
    if (t - computedAt < PINNED_RECOMPUTE_INTERVAL_MS) return cached;
    computedAt = t;
    const heights = new Set<number>();
    for (const { key: account } of hot.top('account', PINNED_TOP_ACCOUNTS)) {
      for (const ref of index.txsForAccount(account, {
        limit: PINNED_ACCOUNT_TX_LIMIT,
      })) {
        heights.add(ref.height);
      }
      for (const h of fallback.heightsFor(account)) heights.add(h);
    }
    for (const { key: txHash } of hot.top('tx', PINNED_TOP_TXS)) {
      const found = index.heightForTx(txHash);
      if (found) heights.add(found.height);
    }
    cached = heights;
    return cached;
  };
}
