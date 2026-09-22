import { ECOSYSTEM_PROJECTS_URL, ETH_CHAIN_NAME } from 'app-commons';
import type { JsonAbi } from 'fuels';
import type { Project } from '~/types/ecosystem';
import type { TransactionNode } from '../types';
import {
  type AbiRegistry,
  collectContractIds,
  decodeOperationReceipts,
} from './abiDecoder';
import {
  type AbiIndex,
  buildAbiIndex,
  resolveAbiRegistry,
} from './abiRegistry';
import { buildTxActivity } from './txActivity';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

let indexPromise: Promise<AbiIndex> | null = null;
const abiCache = new Map<string, Promise<JsonAbi>>();

function getAbiIndex() {
  if (!indexPromise) {
    indexPromise = fetchJson<Project[]>(ECOSYSTEM_PROJECTS_URL as string)
      .then((projects) => buildAbiIndex(projects, ETH_CHAIN_NAME))
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }
  return indexPromise;
}

function loadAbiCached(url: string) {
  let abi = abiCache.get(url);
  if (!abi) {
    abi = fetchJson<JsonAbi>(url).catch((error) => {
      abiCache.delete(url);
      throw error;
    });
    abiCache.set(url, abi);
  }
  return abi;
}

export async function getAbiRegistry(contractIds: string[]) {
  if (!ECOSYSTEM_PROJECTS_URL || !contractIds.length) {
    return { contracts: {} } as AbiRegistry;
  }
  const index = await getAbiIndex();
  return resolveAbiRegistry(index, contractIds, loadAbiCached);
}

// Adds a `decoded` field to receipts of contracts whose ABI is published in
// the ecosystem projects list, and a plain-language `activity` summary. Leaves the transaction unchanged on failure.
export async function decodeTransaction(
  transaction: TransactionNode,
): Promise<TransactionNode> {
  try {
    const operations = transaction.operations ?? [];
    const registry = await getAbiRegistry(collectContractIds(operations));
    if (!Object.keys(registry.contracts).length) return transaction;
    decodeOperationReceipts(operations, transaction.rawPayload, registry);
    transaction.activity = buildTxActivity(operations, registry);
  } catch (error) {
    console.error('Failed to decode transaction receipts:', error);
  }
  return transaction;
}
