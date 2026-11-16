import { ETH_CHAIN_NAME } from 'app-commons';
import type { Project } from '~/types/ecosystem';
import type { TxApp } from './txAppsCache';

export function indexByContract(projects: Project[]) {
  const index = new Map<string, TxApp>();
  for (const project of projects) {
    for (const contract of project.contracts?.[ETH_CHAIN_NAME] ?? []) {
      index.set(contract.id.toLowerCase(), {
        name: project.name,
        image: project.image,
        url: project.url,
      });
    }
  }
  return index;
}

// One count per transaction, even when it calls several of the app's contracts.
export function appsInBlock(
  transactions: { inputContracts: string[] | null }[],
  index: Map<string, TxApp>,
) {
  const counts = new Map<string, { app: TxApp; count: number }>();
  for (const tx of transactions) {
    const seen = new Set<string>();
    for (const contractId of tx.inputContracts ?? []) {
      const app = index.get(contractId.toLowerCase());
      if (!app || seen.has(app.name)) continue;
      seen.add(app.name);
      const row = counts.get(app.name);
      if (row) row.count += 1;
      else counts.set(app.name, { app, count: 1 });
    }
  }
  return [...counts.values()].map(({ app, count }) => ({ ...app, count }));
}

export function rankApps(groups: TxApp[][], limit = 3) {
  const totals = new Map<string, TxApp>();
  for (const apps of groups) {
    for (const app of apps) {
      const prev = totals.get(app.name);
      totals.set(app.name, {
        ...app,
        count: (prev?.count ?? 0) + (app.count ?? 0),
      });
    }
  }
  return [...totals.values()]
    .filter((app) => (app.count ?? 0) > 0)
    .sort(
      (a, b) => (b.count ?? 0) - (a.count ?? 0) || a.name.localeCompare(b.name),
    )
    .slice(0, limit);
}

export function collectApps(
  contractIds: Iterable<string | null | undefined>,
  index: Map<string, TxApp>,
) {
  const apps = new Map<string, TxApp>();
  for (const contractId of contractIds) {
    if (!contractId) continue;
    const app = index.get(contractId.toLowerCase());
    if (app) apps.set(app.name, app);
  }
  return [...apps.values()];
}
