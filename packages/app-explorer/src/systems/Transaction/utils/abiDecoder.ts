import type { GQLOperationReceipt } from '@fuel-explorer/graphql/sdk';
import {
  BN,
  Interface,
  type JsonAbi,
  StdStringCoder,
  TransactionCoder,
  TransactionType,
  arrayify,
  concat,
  hexlify,
  toBytes,
} from 'fuels';

export type DecodedReceipt = {
  kind: 'call' | 'log';
  contractId: string;
  contractName?: string;
  name: string;
  value: unknown;
  // True when only the method name is known and `value` is raw call data.
  raw?: boolean;
};

export type DecodedOperationReceipt = GQLOperationReceipt & {
  decoded?: DecodedReceipt;
};

export type AbiSource = { name: string; abi: JsonAbi };

export type MarketMetadata = {
  symbol: string;
  baseAssetId: string;
  quoteAssetId: string;
};

// `accounts` holds only unlisted contracts verified on chain.
export type AbiRegistry = {
  contracts: Record<
    string,
    AbiSource & { market?: MarketMetadata; project?: string }
  >;
  accounts?: Record<string, AbiSource>;
  names?: Record<string, string>;
};

type ReceiptNode = {
  receipt: DecodedOperationReceipt;
  receiptType?: string | null;
  id?: string | null;
  to?: string | null;
  rb?: string | null;
  data?: string | null;
  param1?: string | null;
  param2?: string | null;
};

type PendingInnerCall = {
  to: string;
  functionName: string;
  callData: Uint8Array;
};

const interfaces = new WeakMap<JsonAbi, Interface>();

function getInterface(abi: JsonAbi) {
  let iface = interfaces.get(abi);
  if (!iface) {
    iface = new Interface(abi);
    interfaces.set(abi, iface);
  }
  return iface;
}

function toJsonSafe(value: unknown): unknown {
  if (value instanceof BN) return value.toString();
  if (value instanceof Uint8Array) return hexlify(value);
  if (Array.isArray(value)) return value.map(toJsonSafe);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, toJsonSafe(v)]),
    );
  }
  return value;
}

function shortTypeName(type: string) {
  const name = type.replace(/^(struct|enum)\s+/, '');
  return name.split('::').pop() ?? name;
}

function logTypeName(abi: JsonAbi, logId: string) {
  const logged = abi.loggedTypes.find((l) => l.logId === logId);
  if (!logged) return null;
  const concrete = abi.concreteTypes.find(
    (c) => c.concreteTypeId === logged.concreteTypeId,
  );
  return concrete ? shortTypeName(concrete.type) : null;
}

function flattenReceipts(
  receipts: Array<DecodedOperationReceipt | null | undefined> | null = [],
  out: ReceiptNode[] = [],
) {
  for (const receipt of receipts ?? []) {
    if (!receipt) continue;
    const item = receipt.item;
    out.push({
      receipt,
      receiptType: item?.receiptType,
      id: item?.id?.toLowerCase(),
      to: item?.to?.toLowerCase(),
      rb: item?.rb,
      data: item?.data,
      param1: item?.param1,
      param2: item?.param2,
    });
    flattenReceipts(receipt.receipts as DecodedOperationReceipt[], out);
  }
  return out;
}

function findSegment(whole: Uint8Array, segment: Uint8Array) {
  outer: for (let i = 0; i <= whole.length - segment.length; i++) {
    for (let j = 0; j < segment.length; j++) {
      if (whole[i + j] !== segment[j]) continue outer;
    }
    return i;
  }
  return -1;
}

function hasFunction(abi: JsonAbi, name: string) {
  return abi.functions.some((f) => f.name === name);
}

function argsToObject(abi: JsonAbi, functionName: string, args: unknown[]) {
  const fn = abi.functions.find((f) => f.name === functionName);
  if (!fn) return toJsonSafe(args);
  return Object.fromEntries(
    fn.inputs.map((input, i) => [input.name, toJsonSafe(args[i])]),
  );
}

// Same script data layout fuels reads in `getContractCalls`.
function decodeScriptCall(
  node: ReceiptNode,
  scriptData: Uint8Array,
  source: AbiSource,
) {
  if (!node.to || node.param1 == null || node.param2 == null) return null;
  const segment = concat([
    arrayify(node.to),
    toBytes(new BN(node.param1).toHex(), 8),
    toBytes(new BN(node.param2).toHex(), 8),
  ]);
  const index = findSegment(scriptData, segment);
  if (index === -1) return null;

  const selectorOffset = index + segment.length;
  const [functionName, argsOffset] = new StdStringCoder().decode(
    scriptData,
    selectorOffset,
  );
  // The VM reads the selector at param1 and the arguments at param2.
  const distance = new BN(node.param2).sub(new BN(node.param1)).toNumber();
  if (distance !== argsOffset - selectorOffset) return null;
  if (!hasFunction(source.abi, functionName)) return null;
  const iface = getInterface(source.abi);
  const fn = iface.getFunction(functionName);
  const args = fn.decodeArguments(scriptData.slice(argsOffset)) ?? [];
  return { functionName, args };
}

// Forwarded calls are matched in order to the Call receipts that follow.
function collectInnerCalls(args: unknown[]): PendingInnerCall[] {
  const calls: PendingInnerCall[] = [];
  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== 'object') return;
    const obj = value as Record<string, unknown>;
    const selector = obj.function_selector;
    const target = (obj.contract_id as { bits?: string } | undefined)?.bits;
    if (selector instanceof Uint8Array && target) {
      const [functionName] = new StdStringCoder().decode(selector, 0);
      const callData =
        obj.call_data instanceof Uint8Array ? obj.call_data : new Uint8Array();
      calls.push({ to: target.toLowerCase(), functionName, callData });
      return;
    }
    Object.values(obj).forEach(visit);
  };
  visit(args);
  return calls;
}

function getScriptData(rawPayload?: string | null) {
  if (!rawPayload) return null;
  try {
    const [tx] = new TransactionCoder().decode(arrayify(rawPayload), 0);
    if (tx.type !== TransactionType.Script) return null;
    return arrayify(tx.scriptData);
  } catch {
    return null;
  }
}

type Operations = Array<{ receipts?: unknown } | null | undefined>;

function flattenOperations(operations: Operations) {
  return operations.flatMap((op) =>
    flattenReceipts((op?.receipts as DecodedOperationReceipt[]) ?? []),
  );
}

export function collectCallerCandidates(
  operations: Operations,
  isListed: (contractId: string) => boolean,
) {
  const candidates: Record<string, string> = {};
  for (const node of flattenOperations(operations)) {
    if (node.receiptType !== 'CALL' || !node.id || !node.to) continue;
    if (!isListed(node.to) || isListed(node.id)) continue;
    candidates[node.id] ??= node.to;
  }
  return candidates;
}

export function collectContractIds(operations: Operations) {
  const ids = new Set<string>();
  for (const node of flattenOperations(operations)) {
    if (node.receiptType === 'CALL' && node.to) ids.add(node.to);
    if (node.receiptType === 'LOG_DATA' && node.id) ids.add(node.id);
  }
  return [...ids];
}

export function decodeOperationReceipts(
  operations: Operations,
  rawPayload: string | null | undefined,
  registry: AbiRegistry,
) {
  const nodes = flattenOperations(operations);

  const sourceFor = (contractId?: string | null): AbiSource | undefined =>
    contractId
      ? (registry.contracts[contractId] ?? registry.accounts?.[contractId])
      : undefined;

  const scriptData = getScriptData(rawPayload);
  const pendingInnerCalls: Record<string, PendingInnerCall[]> = {};

  for (const node of nodes) {
    try {
      if (node.receiptType === 'LOG_DATA' && node.rb && node.data) {
        const source = sourceFor(node.id);
        const name = source && logTypeName(source.abi, node.rb);
        if (!source || !name) continue;
        const [value, end] = getInterface(source.abi).decodeLog(
          node.data,
          node.rb,
        );
        // Leftover bytes mean the data does not have this type's layout.
        if (end !== arrayify(node.data).length) continue;
        node.receipt.decoded = {
          kind: 'log',
          contractId: node.id as string,
          contractName: source.name,
          name,
          value: toJsonSafe(value),
        };
        continue;
      }

      if (node.receiptType !== 'CALL' || !node.to) continue;

      if (!node.id) {
        const source = sourceFor(node.to);
        const call =
          source && scriptData && decodeScriptCall(node, scriptData, source);
        if (!source || !call) continue;
        node.receipt.decoded = {
          kind: 'call',
          contractId: node.to,
          contractName: source.name,
          name: call.functionName,
          value: argsToObject(source.abi, call.functionName, call.args),
        };
        pendingInnerCalls[node.to] = collectInnerCalls(call.args);
        continue;
      }

      const queue = pendingInnerCalls[node.id];
      const next = queue?.[0];
      if (!next || next.to !== node.to) continue;
      queue.shift();
      const source = sourceFor(node.to);
      // The forwarded selector names the method even without the callee ABI.
      if (!source || !hasFunction(source.abi, next.functionName)) {
        node.receipt.decoded = {
          kind: 'call',
          contractId: node.to,
          contractName: source?.name ?? registry.names?.[node.to],
          name: next.functionName,
          value: hexlify(next.callData),
          raw: true,
        };
        continue;
      }
      const fn = getInterface(source.abi).getFunction(next.functionName);
      const args = fn.decodeArguments(next.callData) ?? [];
      node.receipt.decoded = {
        kind: 'call',
        contractId: node.to,
        contractName: source.name,
        name: next.functionName,
        value: argsToObject(source.abi, next.functionName, args),
      };
    } catch {}
  }

  return operations;
}
