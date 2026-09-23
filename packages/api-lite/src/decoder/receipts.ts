import {
  ZERO_B256,
  bytesOf,
  record,
  toB256,
  toHex,
  toU64String,
} from './values';

export type GQLReceiptOut = {
  __typename: 'Receipt';
  receiptType: string;
  [k: string]: string | null | undefined;
};

// fuel-core's Receipt is one flat GraphQL type shared by every receipt variant;
// fields that don't apply to a given receiptType are still present, serialized
// as null (not omitted). Mirror that here so direct decodeBlock() output already
// matches the wire shape instead of relying on the GraphQL layer to backfill nulls.
const ALL_RECEIPT_FIELDS: ReceiptStringField[] = [
  'amount',
  'assetId',
  'contractId',
  'data',
  'digest',
  'gas',
  'gasUsed',
  'id',
  'is',
  'len',
  'nonce',
  'param1',
  'param2',
  'pc',
  'ptr',
  'ra',
  'rb',
  'rc',
  'rd',
  'reason',
  'recipient',
  'result',
  'sender',
  'subId',
  'to',
  'toAddress',
  'val',
];

type ReceiptType =
  | 'CALL'
  | 'RETURN'
  | 'RETURN_DATA'
  | 'PANIC'
  | 'REVERT'
  | 'LOG'
  | 'LOG_DATA'
  | 'TRANSFER'
  | 'TRANSFER_OUT'
  | 'SCRIPT_RESULT'
  | 'MESSAGE_OUT'
  | 'MINT'
  | 'BURN';

type ReceiptStringField = Exclude<
  keyof Omit<GQLReceiptOut, '__typename'>,
  'receiptType'
>;

const RECEIPT_VARIANT: Record<string, ReceiptType> = {
  call: 'CALL',
  returnReceipt: 'RETURN',
  returnData: 'RETURN_DATA',
  panic: 'PANIC',
  revert: 'REVERT',
  log: 'LOG',
  logData: 'LOG_DATA',
  transfer: 'TRANSFER',
  transferOut: 'TRANSFER_OUT',
  scriptResult: 'SCRIPT_RESULT',
  messageOut: 'MESSAGE_OUT',
  mint: 'MINT',
  burn: 'BURN',
};

export const SCRIPT_RESULT_SUCCESS = '0';
const SCRIPT_RESULT_REVERT = '1';
const SCRIPT_RESULT_PANIC = '2';

export function scriptResultCode(result: unknown): {
  code: string;
  ok: boolean;
} {
  const r = record(result, 'ScriptExecutionResult');
  if (r.success != null) return { code: SCRIPT_RESULT_SUCCESS, ok: true };
  if (r.revert != null) return { code: SCRIPT_RESULT_REVERT, ok: false };
  if (r.panic != null) return { code: SCRIPT_RESULT_PANIC, ok: false };
  if (r.genericFailure != null) {
    const code = toU64String(record(r.genericFailure, 'GenericFailure').code);
    return { code, ok: code === SCRIPT_RESULT_SUCCESS };
  }
  throw new Error(
    `unknown ScriptExecutionResult oneof: ${Object.keys(r).join(',')}`,
  );
}

function panicReasonPacked(reason: unknown): string {
  const r = record(reason, 'PanicReason');
  const reasonCode = Number(toU64String(r.reason ?? 0));
  const instruction = Number(toU64String(r.instruction ?? 0));
  const packed = BigInt(reasonCode) | (BigInt(instruction) << 8n);
  return packed.toString();
}

function receiptVariant(proto: Record<string, unknown>): {
  type: ReceiptType;
  body: Record<string, unknown>;
} {
  for (const [key, type] of Object.entries(RECEIPT_VARIANT)) {
    if (proto[key] != null) {
      return { type, body: record(proto[key], key) };
    }
  }
  throw new Error(
    `unknown Receipt oneof: ${Object.keys(proto)
      .filter((k) => k !== '$type')
      .join(',')}`,
  );
}

export function mapReceipt(proto: unknown): GQLReceiptOut {
  const { type, body } = receiptVariant(record(proto, 'Receipt'));
  const mapped: GQLReceiptOut = { __typename: 'Receipt', receiptType: type };
  for (const field of ALL_RECEIPT_FIELDS) mapped[field] = null;

  const putU64 = (field: ReceiptStringField, src: string) => {
    mapped[field] = toU64String(body[src]);
  };
  const putHex = (field: ReceiptStringField, src: string) => {
    mapped[field] = toHex(bytesOf(body[src])) ?? '0x';
  };
  const putId = () => {
    const id = toB256(bytesOf(body.id));
    if (id !== ZERO_B256) mapped.id = id;
  };

  switch (type) {
    case 'CALL':
      putId();
      mapped.to = toB256(bytesOf(body.to));
      putU64('amount', 'amount');
      mapped.assetId = toB256(bytesOf(body.assetId));
      putU64('gas', 'gas');
      putU64('param1', 'param1');
      putU64('param2', 'param2');
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    case 'RETURN':
      putId();
      putU64('val', 'val');
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    case 'RETURN_DATA':
      putId();
      putU64('ptr', 'ptr');
      putU64('len', 'len');
      mapped.digest = toB256(bytesOf(body.digest));
      putU64('pc', 'pc');
      putU64('is', 'is');
      putHex('data', 'data');
      break;
    case 'PANIC':
      putId();
      mapped.reason = panicReasonPacked(body.reason);
      putU64('pc', 'pc');
      putU64('is', 'is');
      if (body.contractId != null) {
        mapped.contractId = toB256(bytesOf(body.contractId));
      }
      break;
    case 'REVERT':
      // fuel-core puts the reverted register value in `ra`, not `val` (`val`
      // stays null for REVERT receipts).
      putId();
      putU64('ra', 'ra');
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    case 'LOG':
      putId();
      putU64('ra', 'ra');
      putU64('rb', 'rb');
      putU64('rc', 'rc');
      putU64('rd', 'rd');
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    case 'LOG_DATA':
      putId();
      putU64('ra', 'ra');
      putU64('rb', 'rb');
      putU64('ptr', 'ptr');
      putU64('len', 'len');
      mapped.digest = toB256(bytesOf(body.digest));
      putU64('pc', 'pc');
      putU64('is', 'is');
      putHex('data', 'data');
      break;
    case 'TRANSFER':
      putId();
      mapped.to = toB256(bytesOf(body.to));
      putU64('amount', 'amount');
      mapped.assetId = toB256(bytesOf(body.assetId));
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    case 'TRANSFER_OUT':
      putId();
      mapped.toAddress = toB256(bytesOf(body.to));
      putU64('amount', 'amount');
      mapped.assetId = toB256(bytesOf(body.assetId));
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    case 'SCRIPT_RESULT': {
      const { code } = scriptResultCode(body.result);
      mapped.result = code;
      putU64('gasUsed', 'gasUsed');
      break;
    }
    case 'MESSAGE_OUT':
      mapped.sender = toB256(bytesOf(body.sender));
      mapped.recipient = toB256(bytesOf(body.recipient));
      putU64('amount', 'amount');
      mapped.nonce = toB256(bytesOf(body.nonce));
      putU64('len', 'len');
      mapped.digest = toB256(bytesOf(body.digest));
      putHex('data', 'data');
      break;
    case 'MINT':
    case 'BURN': {
      mapped.id = toB256(bytesOf(body.contractId));
      mapped.subId = toB256(bytesOf(body.subId));
      putU64('val', 'val');
      putU64('pc', 'pc');
      putU64('is', 'is');
      break;
    }
  }

  return mapped;
}

export function mapReceipts(group: unknown): GQLReceiptOut[] {
  if (group == null) return [];
  const list = record(group, 'Receipts').receipts;
  if (!Array.isArray(list)) return [];
  return list.map(mapReceipt);
}
