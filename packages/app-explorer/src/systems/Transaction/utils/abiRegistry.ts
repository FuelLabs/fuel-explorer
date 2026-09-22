import type { JsonAbi } from 'fuels';
import type { Project } from '~/types/ecosystem';
import type { AbiRegistry, AbiSource, MarketMetadata } from './abiDecoder';

type AccountRef = {
  name: string;
  abi: string;
  verify?: { contractId: string; method: string };
};
type ContractRef = {
  name: string;
  abi?: string;
  accounts: AccountRef[];
  market?: MarketMetadata;
  project: string;
};
export type AbiIndex = Record<string, ContractRef>;

type AbiLoader = (url: string) => Promise<JsonAbi>;

// Calls `method(child)` on a listed contract and returns its boolean answer.
export type AccountVerifier = (
  contractId: string,
  abi: JsonAbi,
  method: string,
  child: string,
) => Promise<boolean>;

export function buildAbiIndex(projects: Project[], network: string) {
  const index: AbiIndex = {};
  for (const project of projects) {
    const accounts = project.callerContracts?.[network] ?? [];
    for (const c of project.contracts?.[network] ?? []) {
      index[c.id.toLowerCase()] = {
        name: c.name,
        abi: c.abi,
        accounts,
        market: c.market,
        project: project.name,
      };
    }
  }
  return index;
}

async function load(loadAbi: AbiLoader, { name, abi }: AccountRef) {
  const json = await loadAbi(abi).catch(() => null);
  return json ? { name, abi: json } : null;
}

// Loads only the ABIs of the given contracts.
export async function resolveAbiRegistry(
  index: AbiIndex,
  contractIds: string[],
  loadAbi: AbiLoader,
): Promise<AbiRegistry> {
  const registry: AbiRegistry = { contracts: {}, names: {}, accounts: {} };

  await Promise.all(
    [...new Set(contractIds.map((id) => id.toLowerCase()))].map(async (id) => {
      const ref = index[id];
      if (!ref) return;
      if (registry.names) registry.names[id] = ref.name;
      if (!ref.abi) return;
      const source = await load(loadAbi, { name: ref.name, abi: ref.abi });
      if (!source) return;
      registry.contracts[id] = {
        ...source,
        market: ref.market,
        project: ref.project,
      };
    }),
  );
  return registry;
}

// An unlisted contract gets an account ABI only when the project's verifier
// contract confirms it on chain. Anyone can deploy a contract that calls a
// listed contract and emits look-alike logs, so the call alone proves nothing.
export async function resolveAccounts(
  index: AbiIndex,
  candidates: Record<string, string>,
  loadAbi: AbiLoader,
  verify: AccountVerifier,
): Promise<Record<string, AbiSource>> {
  const accounts: Record<string, AbiSource> = {};

  await Promise.all(
    Object.entries(candidates).map(async ([candidate, callee]) => {
      for (const ref of index[callee]?.accounts ?? []) {
        const check = ref.verify;
        const verifierAbi = check && index[check.contractId.toLowerCase()]?.abi;
        if (!check || !verifierAbi) continue;
        const ok = await loadAbi(verifierAbi)
          .then((abi) => verify(check.contractId, abi, check.method, candidate))
          .catch(() => false);
        if (!ok) continue;
        const source = await load(loadAbi, ref);
        if (source) accounts[candidate] = source;
        return;
      }
    }),
  );
  return accounts;
}

// ABIs are only loaded from where the projects list itself is published,
// so an entry in the list cannot point the browser at an arbitrary host.
export function isTrustedAbiUrl(abiUrl: string, projectsUrl: string) {
  try {
    const abi = new URL(abiUrl);
    const projects = new URL(projectsUrl);
    if (abi.origin !== projects.origin) return false;
    if (abi.hostname !== 'raw.githubusercontent.com') return true;
    const repo = (url: URL) => url.pathname.split('/').slice(1, 3).join('/');
    return repo(abi) === repo(projects);
  } catch {
    return false;
  }
}
