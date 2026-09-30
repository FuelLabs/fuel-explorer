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
      });
    }
  }
  return index;
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
