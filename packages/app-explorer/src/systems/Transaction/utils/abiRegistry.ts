import type { JsonAbi } from 'fuels';
import type { Project } from '~/types/ecosystem';
import type { AbiRegistry, MarketMetadata } from './abiDecoder';

type AbiRef = { name: string; abi: string };
type ContractRef = {
  name: string;
  abi?: string;
  callers: AbiRef[];
  market?: MarketMetadata;
  project: string;
};
export type AbiIndex = Record<string, ContractRef>;

type AbiLoader = (url: string) => Promise<JsonAbi>;

export function buildAbiIndex(projects: Project[], network: string) {
  const index: AbiIndex = {};
  for (const project of projects) {
    const callers = project.callerContracts?.[network] ?? [];
    for (const c of project.contracts?.[network] ?? []) {
      index[c.id.toLowerCase()] = {
        name: c.name,
        abi: c.abi,
        callers,
        market: c.market,
        project: project.name,
      };
    }
  }
  return index;
}

// Loads only the ABIs of the given contracts and of their projects' callers.
export async function resolveAbiRegistry(
  index: AbiIndex,
  contractIds: string[],
  loadAbi: AbiLoader,
): Promise<AbiRegistry> {
  const registry: AbiRegistry = { contracts: {}, names: {} };
  const load = async ({ name, abi }: AbiRef) => {
    const json = await loadAbi(abi).catch(() => null);
    return json ? { name, abi: json } : null;
  };

  await Promise.all(
    [...new Set(contractIds.map((id) => id.toLowerCase()))].map(async (id) => {
      const ref = index[id];
      if (!ref) return;
      if (registry.names) registry.names[id] = ref.name;
      if (!ref.abi) return;
      const [source, ...callers] = await Promise.all([
        load({ name: ref.name, abi: ref.abi }),
        ...ref.callers.map(load),
      ]);
      if (!source) return;
      registry.contracts[id] = {
        ...source,
        callers: callers.filter((c) => c !== null),
        market: ref.market,
        project: ref.project,
      };
    }),
  );
  return registry;
}
