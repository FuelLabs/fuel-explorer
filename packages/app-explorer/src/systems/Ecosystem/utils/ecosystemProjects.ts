import { ECOSYSTEM_PROJECTS_URL } from 'app-commons';
import type { Project } from '~/types/ecosystem';

const FETCH_TIMEOUT_MS = 10_000;

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

// Many components ask for project metadata on one page, so share one fetch.
let projectsPromise: Promise<Project[]> | null = null;

export function fetchEcosystemProjects(): Promise<Project[]> {
  if (!ECOSYSTEM_PROJECTS_URL) return Promise.resolve([]);
  projectsPromise ??= fetchJson<Project[]>(ECOSYSTEM_PROJECTS_URL).catch(
    (error) => {
      projectsPromise = null;
      throw error;
    },
  );
  return projectsPromise;
}
