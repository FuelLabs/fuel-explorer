import type { GQLSearchResult, Maybe } from '@fuel-explorer/graphql/sdk';
import { useSyncExternalStore } from 'react';

type SearchHitKind =
  | 'account'
  | 'block_hash'
  | 'block_height'
  | 'contract'
  | 'transaction';

export type SearchHit = {
  kind: SearchHitKind;
  value: string;
  href: string;
};

const KINDS: SearchHitKind[] = [
  'account',
  'block_hash',
  'block_height',
  'contract',
  'transaction',
];

export function hitsFromResult(
  result: Maybe<GQLSearchResult> | undefined,
  query: string,
): SearchHit[] {
  if (!result) return [];
  const hits: SearchHit[] = [];
  const address = result.account?.address;
  if (address) {
    hits.push({
      kind: 'account',
      value: address,
      href: `/account/${address}/assets`,
    });
  }
  const block = result.block;
  if (block?.id && block.id.toLowerCase() === query.toLowerCase()) {
    hits.push({
      kind: 'block_hash',
      value: block.id,
      href: `/block/${block.id}/simple`,
    });
  }
  if (block?.height && block.height === query) {
    hits.push({
      kind: 'block_height',
      value: block.height,
      href: `/block/${block.height}/simple`,
    });
  }
  if (result.contract?.id) {
    hits.push({
      kind: 'contract',
      value: result.contract.id,
      href: `/contract/${result.contract.id}`,
    });
  }
  if (result.transaction?.id) {
    hits.push({
      kind: 'transaction',
      value: result.transaction.id,
      href: `/tx/${result.transaction.id}`,
    });
  }
  const predicate = result.predicate?.address;
  if (predicate) {
    hits.push({
      kind: 'account',
      value: predicate,
      href: `/account/${predicate}/assets`,
    });
  }
  return hits;
}

// Stored per origin, so each network keeps its own list.
const STORAGE_KEY = 'fuel-explorer-recent-searches';
const MAX_RECENT = 5;
const EMPTY: SearchHit[] = [];

let cache: SearchHit[] | null = null;
const listeners = new Set<() => void>();

function isHit(value: unknown): value is SearchHit {
  const hit = value as SearchHit;
  return (
    !!hit &&
    KINDS.includes(hit.kind) &&
    typeof hit.value === 'string' &&
    typeof hit.href === 'string' &&
    hit.href.startsWith('/')
  );
}

function read(): SearchHit[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed.filter(isHit) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: SearchHit[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addRecentSearch(hit: SearchHit) {
  const rest = read().filter(
    (item) => !(item.kind === hit.kind && item.value === hit.value),
  );
  write([hit, ...rest].slice(0, MAX_RECENT));
}

export function clearRecentSearches() {
  write(EMPTY);
}

export function useRecentSearches(): SearchHit[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
