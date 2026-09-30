import { useQuery } from '@tanstack/react-query';
import { FUEL_CHAIN } from 'app-commons';
import { fetchEcosystemProjects } from '~/systems/Ecosystem/utils/ecosystemProjects';
import { appsInBlock, indexByContract, rankApps } from '../utils/matchApps';
import {
  type TxApp,
  listBlockApps,
  readBlockApps,
  writeBlockApps,
} from '../utils/txAppsCache';

export type BlockApps = Record<string, TxApp[]>;

type BlockNode = {
  transactions: { inputContracts: string[] | null }[];
} | null;

async function fetchBlockContracts(heights: string[]) {
  const aliases = heights
    .map(
      (height, i) =>
        `b${i}: block(height: "${height}") { transactions { inputContracts } }`,
    )
    .join(' ');
  const res = await fetch(FUEL_CHAIN.providerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ ${aliases} }` }),
  });
  if (!res.ok) throw new Error(`Node returned ${res.status}`);
  const { data } = (await res.json()) as {
    data: Record<string, BlockNode> | null;
  };
  if (!data) throw new Error('Node returned no data');
  return heights.map((height, i) => {
    const block = data[`b${i}`];
    // A block the node does not know yet is left out so the next refresh retries it.
    if (!block) return null;
    return { height, transactions: block.transactions };
  });
}

async function fetchBlockApps(heights: string[]): Promise<BlockApps> {
  const { hits, misses } = readBlockApps(heights);
  if (!misses.length) return hits;

  const [blocks, projects] = await Promise.all([
    fetchBlockContracts(misses),
    fetchEcosystemProjects(),
  ]);
  const index = indexByContract(projects);
  const found: BlockApps = {};
  for (const block of blocks) {
    if (!block) continue;
    found[block.height] = appsInBlock(block.transactions, index);
  }
  writeBlockApps(found);
  return { ...hits, ...found };
}

export function useBlockApps(heights: string[]) {
  const safe = heights.filter((height) => /^\d+$/.test(height));
  const cached = readBlockApps(safe);
  const { data, isPending, isFetching } = useQuery({
    queryKey: ['block-apps', safe.join(',')],
    queryFn: () => fetchBlockApps(safe),
    initialData: () => {
      const { hits, misses } = readBlockApps(safe);
      return misses.length ? undefined : hits;
    },
    enabled: safe.length > 0 && cached.misses.length > 0,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });

  const apps = data ?? cached.hits;
  return {
    apps,
    top: rankApps(listBlockApps()),
    isResolving: cached.misses.length > 0 && (isPending || isFetching),
  };
}
