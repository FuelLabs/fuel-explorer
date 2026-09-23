import {
  ECOSYSTEM_PROJECTS_URL,
  ETH_CHAIN_NAME,
  FUEL_CHAIN,
} from 'app-commons';
import { Contract, type JsonAbi, Provider } from 'fuels';
import {
  fetchEcosystemProjects,
  fetchJson,
} from '~/systems/Ecosystem/utils/ecosystemProjects';
import type { TransactionNode } from '../types';
import {
  collectCallerCandidates,
  collectContractIds,
  decodeOperationReceipts,
} from './abiDecoder';
import {
  type AbiIndex,
  type AccountVerifier,
  buildAbiIndex,
  isTrustedAbiUrl,
  resolveAbiRegistry,
  resolveAccounts,
} from './abiRegistry';
import { buildTxActivity } from './txActivity';

const VERIFY_TIMEOUT_MS = 10_000;

let indexPromise: Promise<AbiIndex> | null = null;
const abiCache = new Map<string, Promise<JsonAbi>>();
const verifyCache = new Map<string, Promise<boolean>>();
let provider: Provider | null = null;

function getAbiIndex() {
  indexPromise ??= fetchEcosystemProjects()
    .then((projects) => buildAbiIndex(projects, ETH_CHAIN_NAME))
    .catch((error) => {
      indexPromise = null;
      throw error;
    });
  return indexPromise;
}

function loadAbi(url: string) {
  if (!isTrustedAbiUrl(url, ECOSYSTEM_PROJECTS_URL ?? '')) {
    return Promise.reject(new Error(`Untrusted ABI URL: ${url}`));
  }
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

// Removes a cache entry only if it still holds this call, so a stale call
// never evicts a newer one for the same account.
function evict(key: string, call: Promise<boolean>) {
  if (verifyCache.get(key) === call) verifyCache.delete(key);
}

// Dry-runs a read-only verifier method. Answers from the chain never change
// for a given account, so they are cached for the session. A timeout or an
// RPC error is not an answer: it resolves false for this page only.
const verifyAccount: AccountVerifier = (contractId, abi, method, child) => {
  const key = `${contractId}:${method}:${child}`;
  let call = verifyCache.get(key);
  if (!call) {
    provider ??= new Provider(FUEL_CHAIN.providerUrl);
    const started = new Contract(contractId, abi, provider).functions[method]({
      bits: child,
    })
      .get()
      .then(({ value }) => value === true);
    verifyCache.set(key, started);
    started.catch(() => evict(key, started));
    call = started;
  }

  // Every caller gets its own timeout, including callers that reuse a call
  // still in flight. A call that times out is dropped so the next page
  // starts a fresh one.
  const pending = call;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<boolean>((resolve) => {
    timer = setTimeout(() => {
      evict(key, pending);
      resolve(false);
    }, VERIFY_TIMEOUT_MS);
  });
  return Promise.race([pending, timeout])
    .catch(() => false)
    .finally(() => clearTimeout(timer));
};

// Returns a copy of the transaction with a `decoded` field on receipts of
// contracts whose ABI is published in the ecosystem projects list, and a
// plain-language `activity` summary. Returns the input unchanged when there
// is nothing to decode or decoding fails.
export async function decodeTransaction(
  transaction: TransactionNode,
): Promise<TransactionNode> {
  try {
    // Only the GraphQL operations are cloned: `summary` holds BN amounts that
    // do not survive a JSON round trip.
    const operations = JSON.parse(
      JSON.stringify(transaction.operations ?? []),
    ) as NonNullable<TransactionNode['operations']>;
    const copy: TransactionNode = { ...transaction, operations };
    const index = await getAbiIndex();
    const registry = await resolveAbiRegistry(
      index,
      collectContractIds(operations),
      loadAbi,
    );
    if (!Object.keys(registry.contracts).length) return transaction;
    registry.accounts = await resolveAccounts(
      index,
      collectCallerCandidates(operations, registry),
      loadAbi,
      verifyAccount,
    );
    decodeOperationReceipts(operations, copy.rawPayload, registry);
    copy.activity = buildTxActivity(operations, registry);
    return copy;
  } catch (error) {
    console.error('Failed to decode transaction receipts:', error);
    return transaction;
  }
}
