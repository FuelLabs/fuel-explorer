import { useQuery } from '@tanstack/react-query';
import { FUEL_CHAIN } from 'app-commons';
import { isValidAddress } from '~/systems/Core/utils/address';
import { fetchEcosystemProjects } from '~/systems/Ecosystem/utils/ecosystemProjects';
import { collectApps, indexByContract } from '../utils/matchApps';
import { type TxApp, readTxApps, writeTxApps } from '../utils/txAppsCache';

export type TxApps = Record<string, TxApp[]>;

type TxContracts = {
  id: string;
  inputContracts: string[] | null;
} | null;

// The indexer's transaction list has no contract data, so one aliased query
// to the node fetches it for the whole page.
async function fetchInputContracts(ids: string[]) {
  const aliases = ids
    .map((id, i) => `t${i}: transaction(id: "${id}") { id inputContracts }`)
    .join(' ');
  const res = await fetch(FUEL_CHAIN.providerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ ${aliases} }` }),
  });
  if (!res.ok) throw new Error(`Node returned ${res.status}`);
  const { data } = (await res.json()) as {
    data: Record<string, TxContracts> | null;
  };
  if (!data) throw new Error('Node returned no data');
  return Object.values(data);
}

async function fetchTxApps(ids: string[]): Promise<TxApps> {
  const { hits, misses } = readTxApps(ids);
  if (!misses.length) return hits;

  const [txs, projects] = await Promise.all([
    fetchInputContracts(misses),
    fetchEcosystemProjects(),
  ]);
  const index = indexByContract(projects);
  const found: TxApps = {};
  for (const tx of txs) {
    // A tx the node does not know yet is left out so the next page load retries it.
    if (!tx) continue;
    found[tx.id] = collectApps(tx.inputContracts ?? [], index);
  }
  writeTxApps(found);
  return { ...hits, ...found };
}

export function useTxApps(
  transactions: { id: string; title?: string | null }[],
  enabled = true,
) {
  const ids = transactions
    .filter((tx) => tx.title === 'Script' && isValidAddress(tx.id))
    .map((tx) => tx.id);

  const { data, isPending } = useQuery({
    queryKey: ['tx-apps', ids.join(',')],
    queryFn: () => fetchTxApps(ids),
    initialData: () => {
      const { hits, misses } = readTxApps(ids);
      return misses.length ? undefined : hits;
    },
    enabled: enabled && ids.length > 0,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
  return { apps: data, isPending: enabled && ids.length > 0 && isPending };
}
