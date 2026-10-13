import type { GQLSearchResult } from '@fuel-explorer/graphql/sdk';
import {
  addRecentSearch,
  clearRecentSearches,
  hitsFromResult,
} from './recentSearches';

const ADDRESS = '0xabc';

describe('hitsFromResult', () => {
  it('returns nothing without a result', () => {
    expect(hitsFromResult(null, 'x')).toEqual([]);
    expect(hitsFromResult(undefined, 'x')).toEqual([]);
  });

  it('shows an address that is both account and predicate once', () => {
    const result = {
      account: { address: ADDRESS },
      predicate: { address: ADDRESS },
    } as unknown as GQLSearchResult;
    const hits = hitsFromResult(result, ADDRESS);
    expect(hits).toHaveLength(1);
    expect(hits[0]).toMatchObject({ kind: 'account', value: ADDRESS });
  });

  it('keeps a predicate that differs from the account', () => {
    const result = {
      account: { address: ADDRESS },
      predicate: { address: '0xdef' },
    } as unknown as GQLSearchResult;
    expect(hitsFromResult(result, ADDRESS)).toHaveLength(2);
  });

  it('matches the block hash only when it equals the query', () => {
    const result = {
      block: { id: '0xAB', height: '7' },
    } as unknown as GQLSearchResult;
    expect(hitsFromResult(result, '0xab').map((hit) => hit.kind)).toEqual([
      'block_hash',
    ]);
    expect(hitsFromResult(result, '7').map((hit) => hit.kind)).toEqual([
      'block_height',
    ]);
    expect(hitsFromResult(result, 'other')).toEqual([]);
  });
});

describe('recent searches', () => {
  beforeEach(() => clearRecentSearches());

  it('moves a repeated hit to the front without duplicating it', () => {
    const a = { kind: 'account', value: '0x1', href: '/account/0x1/assets' };
    const b = { kind: 'contract', value: '0x2', href: '/contract/0x2' };
    addRecentSearch(a as never);
    addRecentSearch(b as never);
    addRecentSearch(a as never);
    expect(
      JSON.parse(localStorage.getItem('fuel-explorer-recent-searches') ?? '[]'),
    ).toEqual([a, b]);
  });

  it('keeps the five newest hits', () => {
    for (let i = 0; i < 7; i++) {
      addRecentSearch({
        kind: 'account',
        value: `0x${i}`,
        href: `/account/0x${i}/assets`,
      });
    }
    const stored = JSON.parse(
      localStorage.getItem('fuel-explorer-recent-searches') ?? '[]',
    );
    expect(stored).toHaveLength(5);
    expect(stored[0].value).toBe('0x6');
  });
});
