import { FallbackHeights } from './FallbackHeights';
import { makePinnedHeights } from './pinnedHeights';

function setup(topAccounts: string[]) {
  const hot = {
    top: (kind: string) =>
      kind === 'account' ? topAccounts.map((key) => ({ key, hits: 1 })) : [],
  };
  const index = {
    txsForAccount: (account: string) =>
      account === '0xhot' ? [{ height: 100, txIndex: 0 }] : [],
    heightForTx: () => null,
  };
  const fallback = new FallbackHeights();
  let t = 0;
  const pinned = makePinnedHeights(hot as any, index as any, fallback, () => t);
  const advance = (ms: number) => {
    t += ms;
  };
  return { fallback, pinned, advance };
}

describe('makePinnedHeights', () => {
  it("pins a hot account's indexed rows and the older pages served from fuel-core", () => {
    const { fallback, pinned } = setup(['0xhot']);
    fallback.record('0xhot', [60, 55]);
    expect([...pinned()].sort((a, b) => a - b)).toEqual([55, 60, 100]);
  });

  it('does not pin fuel-core pages of an account outside the top list', () => {
    const { fallback, pinned } = setup(['0xhot']);
    fallback.record('0xcold', [40]);
    expect(pinned().has(40)).toBe(false);
  });

  it('picks up new fuel-core pages once the recompute interval passes', () => {
    const { fallback, pinned, advance } = setup(['0xhot']);
    expect(pinned().has(60)).toBe(false);
    fallback.record('0xhot', [60]);
    advance(59_999);
    expect(pinned().has(60)).toBe(false);
    advance(1);
    expect(pinned().has(60)).toBe(true);
  });
});
