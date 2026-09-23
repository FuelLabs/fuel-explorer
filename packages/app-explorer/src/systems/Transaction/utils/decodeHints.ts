import type { Project } from '~/types/ecosystem';

type Receipt = {
  item?: {
    receiptType?: string | null;
    id?: string | null;
    to?: string | null;
  } | null;
  receipts?: unknown;
};

function collect(receipts: unknown, ids: Set<string>) {
  for (const r of (receipts as Receipt[] | null) ?? []) {
    const item = r?.item;
    if (item?.receiptType === 'CALL' && item.to) ids.add(item.to.toLowerCase());
    if (item?.receiptType === 'LOG_DATA' && item.id) {
      ids.add(item.id.toLowerCase());
    }
    collect(r?.receipts, ids);
  }
}

// Contracts a transaction called or logged from. Cheap and synchronous, so
// the page can decide how to render before any decoding runs.
export function touchedContracts(
  operations: Array<{ receipts?: unknown } | null> | null | undefined,
) {
  const ids = new Set<string>();
  for (const op of operations ?? []) collect(op?.receipts, ids);
  return ids;
}

export function touchesDecodableContract(
  contractIds: Set<string>,
  projects: Project[] | null,
  network: string,
) {
  if (!projects) return false;
  return projects.some((project) =>
    (project.contracts?.[network] ?? []).some(
      (c) => c.abi && contractIds.has(c.id.toLowerCase()),
    ),
  );
}
