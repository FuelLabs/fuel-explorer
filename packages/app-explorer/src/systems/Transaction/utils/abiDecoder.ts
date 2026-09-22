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
};

export type DecodedOperationReceipt = GQLOperationReceipt & {
  decoded?: DecodedReceipt;
};

type AbiSource = { name: string; abi: JsonAbi };

export type MarketMetadata = {
  symbol: string;
  baseAssetId: string;
  quoteAssetId: string;
};

// `contracts` are ABIs keyed by fixed contract id. `callers` are ABIs for
// contracts without a fixed id (e.g. per-user accounts), applied to any
// contract that calls one of the project's fixed contracts. `names` labels
// listed contracts that publish no ABI.
export type AbiRegistry = {
  contracts: Record<
    string,
    AbiSource & {
      callers: AbiSource[];
      market?: MarketMetadata;
      project?: string;
    }
  >;
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

function argsToObject(abi: JsonAbi, functionName: string, args: unknown[]) {
  const fn = abi.functions.find((f) => f.name === functionName);
  if (!fn) return toJsonSafe(args);
  return Object.fromEntries(
    fn.inputs.map((input, i) => [input.name, toJsonSafe(args[i])]),
  );
}

// Top-level calls from the script: the script data holds the contract id,
// the function selector and argument offsets, followed by the encoded
// selector and arguments. Same layout fuels uses in `getContractCalls`.
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

  const [functionName, argsOffset] = new StdStringCoder().decode(
    scriptData,
    index + segment.length,
  );
  const iface = getInterface(source.abi);
  const fn = iface.getFunction(functionName);
  const args = fn.decodeArguments(scriptData.slice(argsOffset)) ?? [];
  return { functionName, args };
}

// Some accounts forward a batch of calls. Each forwarded call carries the
// target contract, an encoded function selector and encoded call data, so
// the inner Call receipts can be named and decoded in order.
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
  const known = registry.contracts;

  // Contracts without a fixed id that call a known contract get the caller
  // ABIs of that contract's project.
  const callerSources: Record<string, AbiSource[]> = {};
  for (const node of nodes) {
    if (node.receiptType !== 'CALL' || !node.id || !node.to) continue;
    const callee = known[node.to];
    if (!callee || known[node.id]) continue;
    callerSources[node.id] = callee.callers;
  }

  const sourcesFor = (contractId?: string | null): AbiSource[] => {
    if (!contractId) return [];
    const fixed = known[contractId];
    return fixed ? [fixed] : (callerSources[contractId] ?? []);
  };

  const scriptData = getScriptData(rawPayload);
  const pendingInnerCalls: Record<string, PendingInnerCall[]> = {};

  for (const node of nodes) {
    try {
      if (node.receiptType === 'LOG_DATA' && node.rb && node.data) {
        for (const source of sourcesFor(node.id)) {
          const name = logTypeName(source.abi, node.rb);
          if (!name) continue;
          const [value] = getInterface(source.abi).decodeLog(
            node.data,
            node.rb,
          );
          node.receipt.decoded = {
            kind: 'log',
            contractId: node.id as string,
            contractName: source.name,
            name,
            value: toJsonSafe(value),
          };
          break;
        }
        continue;
      }

      if (node.receiptType !== 'CALL' || !node.to) continue;

      if (!node.id) {
        if (!scriptData) continue;
        for (const source of sourcesFor(node.to)) {
          const call = decodeScriptCall(node, scriptData, source);
          if (!call) continue;
          node.receipt.decoded = {
            kind: 'call',
            contractId: node.to,
            contractName: source.name,
            name: call.functionName,
            value: argsToObject(source.abi, call.functionName, call.args),
          };
          pendingInnerCalls[node.to] = collectInnerCalls(call.args);
          break;
        }
        continue;
      }

      const queue = pendingInnerCalls[node.id];
      const next = queue?.[0];
      if (!next || next.to !== node.to) continue;
      queue.shift();
      const [source] = sourcesFor(node.to);
      // The forwarded selector names the method even without the callee ABI.
      if (!source) {
        node.receipt.decoded = {
          kind: 'call',
          contractId: node.to,
          contractName: registry.names?.[node.to],
          name: next.functionName,
          value: hexlify(next.callData),
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
    } catch {
      // A receipt that does not match its ABI stays raw.
    }
  }

  return operations;
}
