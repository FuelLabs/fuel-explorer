import { PolicyType, type Transaction } from 'fuels';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';
import { type FeeParams, computeGasAndFee } from './fee';
import {
  computeTxId,
  encodeRawPayload,
  toFuelsTransaction,
  txVariant,
} from './fuelsTx';
import { mapInput } from './inputs';
import { mapOutput } from './outputs';
import { type GQLReceiptOut, mapReceipts } from './receipts';
import {
  ZERO_B256,
  bytesOf,
  record,
  toB256,
  toHex,
  toNumber,
  toU64String,
  txPointerHex,
} from './values';

export type BlockRef = {
  id: string;
  height: number;
  time: string;
  daHeight: string;
  applicationHash: string;
  messageReceiptCount: string;
};

const PANIC_NAMES = [
  'UNKNOWN',
  'REVERT',
  'OUT_OF_GAS',
  'TRANSACTION_VALIDITY',
  'MEMORY_OVERFLOW',
  'ARITHMETIC_OVERFLOW',
  'CONTRACT_NOT_FOUND',
  'MEMORY_OWNERSHIP',
  'NOT_ENOUGH_BALANCE',
  'EXPECTED_INTERNAL_CONTEXT',
  'ASSET_ID_NOT_FOUND',
  'INPUT_NOT_FOUND',
  'OUTPUT_NOT_FOUND',
  'WITNESS_NOT_FOUND',
  'TRANSACTION_MATURITY',
  'INVALID_METADATA_IDENTIFIER',
  'MALFORMED_CALL_STRUCTURE',
  'RESERVED_REGISTER_NOT_WRITABLE',
  'INVALID_FLAGS',
  'INVALID_IMMEDIATE_VALUE',
  'EXPECTED_COIN_INPUT',
  'ECAL_ERROR',
  'MEMORY_WRITE_OVERLAP',
  'CONTRACT_NOT_IN_INPUTS',
  'INTERNAL_BALANCE_OVERFLOW',
  'CONTRACT_MAX_SIZE',
  'EXPECTED_UNALLOCATED_STACK',
  'MAX_STATIC_CONTRACTS_REACHED',
  'TRANSFER_AMOUNT_CANNOT_BE_ZERO',
  'EXPECTED_OUTPUT_VARIABLE',
  'EXPECTED_PARENT_INTERNAL_CONTEXT',
  'PREDICATE_RETURNED_NON_ONE',
  'CONTRACT_ID_ALREADY_DEPLOYED',
  'CONTRACT_MISMATCH',
  'MESSAGE_DATA_TOO_LONG',
  'ARITHMETIC_ERROR',
  'CONTRACT_INSTRUCTION_NOT_ALLOWED',
  'TRANSFER_ZERO_COINS',
  'INVALID_INSTRUCTION',
  'MEMORY_NOT_EXECUTABLE',
  'POLICY_IS_NOT_SET',
  'POLICY_NOT_FOUND',
  'TOO_MANY_RECEIPTS',
  'BALANCE_OVERFLOW',
  'INVALID_BLOCK_HEIGHT',
  'TOO_MANY_SLOTS',
  'EXPECTED_NESTED_CALLER',
  'MEMORY_GROWTH_OVERLAP',
  'UNINITALIZED_MEMORY_ACCESS',
  'OVERRIDING_CONSENSUS_PARAMETERS',
  'UNKNOWN_STATE_TRANSACTION_BYTECODE_ROOT',
  'OVERRIDING_STATE_TRANSACTION_BYTECODE',
  'BYTECODE_ALREADY_UPLOADED',
  'THE_PART_IS_NOT_SEQUENTIALLY_CONNECTED',
  'BLOB_NOT_FOUND',
  'BLOB_ID_ALREADY_UPLOADED',
  'GAS_COST_NOT_DEFINED',
  'UNSUPPORTED_CURVE_ID',
  'UNSUPPORTED_OPERATION_TYPE',
  'INVALID_ELLIPTIC_CURVE_POINT',
  'INPUT_CONTRACT_DOES_NOT_EXIST',
  'STORAGE_SLOTS_NOT_FOUND',
  'PROOF_IN_UPLOAD_NOT_FOUND',
  'INVALID_UPGRADE_PURPOSE_TYPE',
  'CAN_NOT_GET_GAS_PRICE_IN_PREDICATE',
];

function policies(body: Record<string, unknown>) {
  const p = body.policies == null ? undefined : record(body.policies);
  if (!p) return null;
  const bits = toNumber(p.bits);
  const values = (p.values as unknown[]) ?? [];
  const out: Record<string, string | null> = {
    __typename: 'Policies',
    tip: null,
    witnessLimit: null,
    maturity: null,
    maxFee: null,
  };
  const positions: [number, PolicyType][] = [
    [0, PolicyType.Tip],
    [1, PolicyType.WitnessLimit],
    [2, PolicyType.Maturity],
    [3, PolicyType.MaxFee],
    [4, PolicyType.Expiration],
    [5, PolicyType.Owner],
  ];
  for (const [position, type] of positions) {
    if ((bits & type) === 0) continue;
    const v = toU64String(values[position]);
    if (type === PolicyType.Tip) out.tip = v;
    if (type === PolicyType.WitnessLimit) out.witnessLimit = v;
    if (type === PolicyType.Maturity) out.maturity = v;
    if (type === PolicyType.MaxFee) out.maxFee = v;
  }
  return out;
}

function u64ToBeHex(value: string | null | undefined): string {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(value ?? '0'));
  return `0x${buf.toString('hex')}`;
}

// fuel-core sets status.program_state from the VM's final Return/ReturnData/Revert
// state, which is always the last receipt of one of those three types (immediately
// before the terminal SCRIPT_RESULT receipt). RETURN stores an 8-byte big-endian
// register value in `val`; REVERT stores it in `ra` (see the REVERT receipt
// mapping in receipts.ts); RETURN_DATA stores the raw returned bytes (data).
function programState(receipts: GQLReceiptOut[]) {
  const last = [...receipts]
    .reverse()
    .find(
      (r) =>
        r.receiptType === 'RETURN' ||
        r.receiptType === 'RETURN_DATA' ||
        r.receiptType === 'REVERT',
    );
  if (!last) return null;
  if (last.receiptType === 'RETURN_DATA') {
    return {
      __typename: 'ProgramState',
      returnType: 'RETURN_DATA',
      data: last.data ?? '0x',
    };
  }
  return {
    __typename: 'ProgramState',
    returnType: last.receiptType === 'REVERT' ? 'REVERT' : 'RETURN',
    data: u64ToBeHex(last.receiptType === 'REVERT' ? last.ra : last.val),
  };
}

function failureReason(receipts: GQLReceiptOut[]): string {
  const panic = receipts.find((r) => r.receiptType === 'PANIC');
  if (panic?.reason != null) {
    const packed = BigInt(panic.reason);
    const name = PANIC_NAMES[Number(packed & 0xffn)] ?? 'UNKNOWN';
    return `PanicInstruction { reason: ${name}, instruction: ${packed >> 8n} }`;
  }
  const revert = receipts.find((r) => r.receiptType === 'REVERT');
  if (revert) return `Revert(${revert.ra ?? '0'})`;
  return 'Failure';
}

function statusFor(
  id: string,
  receipts: GQLReceiptOut[],
  variant: string,
  block: BlockRef,
) {
  const last = receipts[receipts.length - 1];
  const failed =
    variant !== 'mint' &&
    last?.receiptType === 'SCRIPT_RESULT' &&
    last.result !== '0';
  const base = {
    time: block.time,
    transactionId: id,
    totalFee: '0',
    totalGas: '0',
    receipts,
    programState: variant === 'mint' ? null : programState(receipts),
    block: {
      __typename: 'Block',
      id: block.id,
      height: String(block.height),
      header: {
        __typename: 'Header',
        id: block.id,
        height: String(block.height),
        daHeight: block.daHeight,
        applicationHash: block.applicationHash,
        messageReceiptCount: block.messageReceiptCount,
        time: block.time,
      },
    },
  };
  return failed
    ? { __typename: 'FailureStatus', reason: failureReason(receipts), ...base }
    : { __typename: 'SuccessStatus', ...base };
}

export function decodeTransaction(
  protoTx: unknown,
  receiptsGroup: unknown,
  ctx: {
    chainId: number;
    block: BlockRef;
    baseAssetId?: string;
    gasPrice?: string;
    fee?: FeeParams;
  },
): GQLTransaction {
  const tx = record(protoTx, 'Transaction');
  const variant = txVariant(tx);
  const isMint = variant === 'mint';
  const body = record(tx[variant]);
  const fuelsTx: Transaction = toFuelsTransaction(tx);
  const rawPayload = encodeRawPayload(fuelsTx);
  const id = computeTxId(rawPayload, ctx.chainId);
  const receipts = mapReceipts(receiptsGroup);

  const inputs = isMint ? [] : ((body.inputs as unknown[]) ?? []).map(mapInput);
  const outputs = isMint
    ? []
    : ((body.outputs as unknown[]) ?? []).map(mapOutput);
  const witnesses = isMint
    ? []
    : ((body.witnesses as unknown[]) ?? []).map((w) => toHex(bytesOf(w)));

  // fuel-core's input_asset_ids() keeps input order and duplicates (it is not
  // the "_unique" variant) and substitutes baseAssetId for message-type inputs,
  // which carry no assetId of their own.
  const inputAssetIds = inputs
    .map((i) => {
      if (i.__typename === 'InputCoin') return i.assetId;
      if (i.__typename === 'InputMessage') return ctx.baseAssetId ?? ZERO_B256;
      return null;
    })
    .filter((v): v is string => v != null);

  // fuel-core's input_contracts() sorts and dedups contract ids from
  // InputContract-type inputs. Mint has no `inputs` array; its lone
  // inputContracts entry is its own (singular) inputContract.
  const inputContracts = isMint
    ? body.inputContract == null
      ? []
      : [toB256(bytesOf(record(body.inputContract).contractId))]
    : Array.from(
        new Set(
          inputs
            .filter((i) => i.__typename === 'InputContract')
            .map((i) => i.contractId),
        ),
      ).sort();

  const out: Record<string, unknown> = {
    __typename: 'Transaction',
    id,
    rawPayload,
    isScript: variant === 'script',
    isCreate: variant === 'create',
    isMint,
    isUpgrade: variant === 'upgrade',
    isUpload: variant === 'upload',
    inputs: isMint ? null : inputs,
    outputs,
    witnesses: isMint ? null : witnesses,
    policies: isMint ? null : policies(body),
    maturity: isMint ? null : '0',
    inputAssetIds: isMint ? null : inputAssetIds,
    inputContracts,
    receiptsRoot: null,
    script: null,
    scriptData: null,
    scriptGasLimit: null,
    bytecodeWitnessIndex: null,
    salt: null,
    storageSlots: null,
    bytecodeRoot: null,
    txPointer: null,
    mintAmount: null,
    mintAssetId: null,
    mintGasPrice: null,
    mintAmountUsd: '',
    inputContract: null,
    outputContract: null,
    upgradePurpose: null,
    proofSet: null,
    subsectionIndex: null,
    subsectionsNumber: null,
    status: statusFor(id, receipts, variant, ctx.block),
  };
  const pol = out.policies as Record<string, string | null> | null;
  if (pol?.maturity) out.maturity = pol.maturity;

  // Reuse the fuelsTx/rawPayload/receipts already computed above instead of
  // block.ts re-deriving them a second time per transaction (that duplicate
  // pass roughly doubled decode time on a large block).
  if (!isMint && ctx.gasPrice != null && ctx.fee != null) {
    const { totalGas, totalFee } = computeGasAndFee(
      fuelsTx,
      rawPayload,
      receipts,
      ctx.gasPrice,
      ctx.fee,
    );
    (out.status as Record<string, unknown>).totalGas = totalGas;
    (out.status as Record<string, unknown>).totalFee = totalFee;
  }

  switch (variant) {
    case 'script':
      out.receiptsRoot = toB256(bytesOf(body.receiptsRoot));
      out.script = toHex(bytesOf(body.script));
      out.scriptData = toHex(bytesOf(body.scriptData));
      out.scriptGasLimit = toU64String(body.scriptGasLimit);
      break;
    case 'create':
      out.bytecodeWitnessIndex = toU64String(body.bytecodeWitnessIndex);
      out.salt = toB256(bytesOf(body.salt));
      out.storageSlots = ((body.storageSlots as unknown[]) ?? []).map((s) => {
        const r = record(s);
        return `${toB256(bytesOf(r.key))}${toB256(bytesOf(r.value)).slice(2)}`;
      });
      break;
    case 'mint': {
      const ptr = record(body.txPointer ?? {});
      out.txPointer = txPointerHex(
        toNumber(ptr.blockHeight),
        toNumber(ptr.txIndex),
      );
      out.mintAmount = toU64String(body.mintAmount);
      out.mintAssetId = toB256(bytesOf(body.mintAssetId));
      out.mintGasPrice = toU64String(body.gasPrice);
      out.inputContract =
        body.inputContract == null
          ? null
          : mapInput({ contract: body.inputContract });
      out.outputContract =
        body.outputContract == null
          ? null
          : mapOutput({ contract: body.outputContract });
      break;
    }
    case 'upgrade': {
      const purpose = record(body.purpose ?? {});
      out.upgradePurpose = purpose.consensusParameters
        ? {
            __typename: 'ConsensusParametersPurpose',
            witnessIndex: toU64String(
              record(purpose.consensusParameters).witnessIndex,
            ),
            checksum: toB256(
              bytesOf(record(purpose.consensusParameters).checksum),
            ),
          }
        : {
            __typename: 'StateTransitionPurpose',
            root: toB256(bytesOf(record(purpose.stateTransition ?? {}).root)),
          };
      break;
    }
    case 'upload':
      out.bytecodeRoot = toB256(bytesOf(body.root));
      out.bytecodeWitnessIndex = toU64String(body.witnessIndex);
      out.subsectionIndex = toU64String(body.subsectionIndex);
      out.subsectionsNumber = toU64String(body.subsectionsNumber);
      out.proofSet = ((body.proofSet as unknown[]) ?? []).map((p) =>
        toB256(bytesOf(p)),
      );
      break;
    case 'blob':
      out.bytecodeWitnessIndex = toU64String(body.witnessIndex);
      break;
  }
  return out as unknown as GQLTransaction;
}
