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
import {
  isCommitPinnedUrl,
  readCache,
  writeCache,
} from '~/systems/Ecosystem/utils/persistentCache';
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
  pinAbiUrl,
  resolveAbiRegistry,
  resolveAccounts,
} from './abiRegistry';
import { buildTxActivity } from './txActivity';

const VERIFY_TIMEOUT_MS = 10_000;
const ABI_REVALIDATE_MS = 24 * 60 * 60 * 1000;

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

function loadAbi(listedUrl: string) {
  const url = pinAbiUrl(listedUrl, ECOSYSTEM_PROJECTS_URL ?? '');
  if (!isTrustedAbiUrl(url, ECOSYSTEM_PROJECTS_URL ?? '')) {
    return Promise.reject(new Error(`Untrusted ABI URL: ${url}`));
  }
  let abi = abiCache.get(url);
  if (abi) return abi;

  const fetchAndStore = () =>
    fetchJson<JsonAbi>(url).then((json) => {
      writeCache(url, json);
      return json;
    });
  const stored = readCache<JsonAbi>(url);
  if (stored) {
    abi = Promise.resolve(stored.value);
    if (
      isCommitPinnedUrl(url) ||
      Date.now() - stored.savedAt < ABI_REVALIDATE_MS
    ) {
      abiCache.set(url, abi);
      return abi;
    }
    fetchAndStore()
      .then((fresh) => abiCache.set(url, Promise.resolve(fresh)))
      .catch(() => {});
  } else {
    abi = fetchAndStore();
    abi.catch(() => abiCache.delete(url));
  }
  abiCache.set(url, abi);
  return abi;
}

// A stale call must never evict a newer one for the same account.
function evict(key: string, call: Promise<boolean>) {
  if (verifyCache.get(key) === call) verifyCache.delete(key);
}

// Only chain answers are cached; timeouts and RPC errors resolve false.
const verifyAccount: AccountVerifier = (contractId, abi, method, child) => {
  const key = `${contractId}:${method}:${child}`;
  // A negative answer can change when the registry updates, so only true is stored.
  if (readCache<boolean>(`verify:${key}`)?.value === true) {
    return Promise.resolve(true);
  }
  let call = verifyCache.get(key);
  if (!call) {
    provider ??= new Provider(FUEL_CHAIN.providerUrl);
    const started = new Contract(contractId, abi, provider).functions[method]({
      bits: child,
    })
      .get()
      .then(({ value }) => value === true);
    verifyCache.set(key, started);
    started.then(
      (ok) => ok && writeCache(`verify:${key}`, true),
      () => evict(key, started),
    );
    call = started;
  }

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

export async function decodeTransaction(
  transaction: TransactionNode,
): Promise<TransactionNode> {
  try {
    // `summary` holds BN amounts that do not survive a JSON round trip.
    const operations = JSON.parse(
      JSON.stringify(transaction.operations ?? []),
    ) as NonNullable<TransactionNode['operations']>;
    const copy: TransactionNode = { ...transaction, operations };
    const index = await getAbiIndex();
    const isListed = (id: string) => !!index[id]?.abi;
    const contractIds = collectContractIds(operations);
    if (!contractIds.some(isListed)) return transaction;
    const [registry, accounts] = await Promise.all([
      resolveAbiRegistry(index, contractIds, loadAbi),
      resolveAccounts(
        index,
        collectCallerCandidates(operations, isListed),
        loadAbi,
        verifyAccount,
      ),
    ]);
    if (!Object.keys(registry.contracts).length) return transaction;
    registry.accounts = accounts;
    decodeOperationReceipts(operations, copy.rawPayload, registry);
    copy.activity = buildTxActivity(
      operations,
      registry,
      transaction.status?.__typename === 'FailureStatus',
    );
    return copy;
  } catch (error) {
    console.error('Failed to decode transaction receipts:', error);
    return transaction;
  }
}
