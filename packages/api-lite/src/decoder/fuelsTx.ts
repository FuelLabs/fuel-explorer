import {
  type Input,
  InputType,
  type Output,
  OutputType,
  type Policy,
  PolicyType,
  type Transaction,
  TransactionCoder,
  TransactionType,
  UpgradePurposeTypeEnum,
  ZeroBytes32,
  arrayify,
  bn,
  concat,
  hexlify,
  sha256,
  uint64ToBytesBE,
} from 'fuels';
import {
  bytesOf,
  record,
  toB256,
  toHex,
  toNumber,
  toU64String,
} from './values';

const POLICY_TYPES = [
  PolicyType.Tip,
  PolicyType.WitnessLimit,
  PolicyType.Maturity,
  PolicyType.MaxFee,
  PolicyType.Expiration,
  PolicyType.Owner,
] as const;

export type Variant =
  | 'script'
  | 'create'
  | 'mint'
  | 'upgrade'
  | 'upload'
  | 'blob';
const VARIANTS: Variant[] = [
  'script',
  'create',
  'mint',
  'upgrade',
  'upload',
  'blob',
];

export function txVariant(protoTx: Record<string, unknown>): Variant {
  const v = VARIANTS.find((k) => protoTx[k] != null);
  if (!v)
    throw new Error(
      `unknown Transaction oneof: ${Object.keys(protoTx).join(',')}`,
    );
  return v;
}

function hexBytes(v: unknown): string {
  return toHex(bytesOf(v));
}

function hexLen(hex: string): number {
  return Math.max(0, (hex.length - 2) / 2);
}

function mapPolicies(policies: Record<string, unknown> | undefined): {
  policies: Policy[];
  policyTypes: number;
} {
  if (!policies) return { policies: [], policyTypes: 0 };
  const bits = toNumber(policies.bits);
  const values = (policies.values as unknown[]) ?? [];
  const out: Policy[] = [];
  POLICY_TYPES.forEach((type, i) => {
    if ((bits & type) === 0) return;
    const data = values[i];
    if (type === PolicyType.Maturity || type === PolicyType.Expiration) {
      out.push({ type, data: toNumber(data) });
    } else {
      out.push({ type, data: bn(toU64String(data ?? 0)) });
    }
  });
  return { policies: out, policyTypes: bits };
}

function mapInput(input: Record<string, unknown>): Input {
  if (input.coinSigned || input.coinPredicate) {
    const c = record(input.coinSigned ?? input.coinPredicate);
    const utxo = record(c.utxoId ?? {});
    const pointer = record(c.txPointer ?? {});
    const predicate = hexBytes(c.predicate);
    const predicateData = hexBytes(c.predicateData);
    return {
      type: InputType.Coin,
      txID: toB256(bytesOf(utxo.txId)),
      outputIndex: toNumber(utxo.outputIndex),
      owner: toB256(bytesOf(c.owner)),
      amount: bn(toU64String(c.amount)),
      assetId: toB256(bytesOf(c.assetId)),
      txPointer: {
        blockHeight: toNumber(pointer.blockHeight),
        txIndex: toNumber(pointer.txIndex),
      },
      witnessIndex: toNumber(c.witnessIndex),
      predicateGasUsed: bn(toU64String(c.predicateGasUsed ?? 0)),
      predicateLength: bn(hexLen(predicate)),
      predicateDataLength: bn(hexLen(predicateData)),
      predicate,
      predicateData,
    };
  }
  if (input.contract) {
    const c = record(input.contract);
    const utxo = record(c.utxoId ?? {});
    const pointer = record(c.txPointer ?? {});
    return {
      type: InputType.Contract,
      txID: toB256(bytesOf(utxo.txId)),
      outputIndex: toNumber(utxo.outputIndex),
      balanceRoot: toB256(bytesOf(c.balanceRoot)),
      stateRoot: toB256(bytesOf(c.stateRoot)),
      txPointer: {
        blockHeight: toNumber(pointer.blockHeight),
        txIndex: toNumber(pointer.txIndex),
      },
      contractID: toB256(bytesOf(c.contractId)),
    };
  }
  const msg =
    input.messageCoinSigned ??
    input.messageCoinPredicate ??
    input.messageDataSigned ??
    input.messageDataPredicate;
  if (msg) {
    const m = record(msg);
    const predicate = hexBytes(m.predicate);
    const predicateData = hexBytes(m.predicateData);
    const data = hexBytes(m.data);
    return {
      type: InputType.Message,
      sender: toB256(bytesOf(m.sender)),
      recipient: toB256(bytesOf(m.recipient)),
      amount: bn(toU64String(m.amount)),
      nonce: toB256(bytesOf(m.nonce)),
      witnessIndex: toNumber(m.witnessIndex),
      predicateGasUsed: bn(toU64String(m.predicateGasUsed ?? 0)),
      dataLength: hexLen(data),
      predicateLength: bn(hexLen(predicate)),
      predicateDataLength: bn(hexLen(predicateData)),
      predicate,
      predicateData,
      data,
    };
  }
  throw new Error(`unknown input oneof: ${Object.keys(input).join(',')}`);
}

function mapOutput(output: Record<string, unknown>): Output {
  if (output.coin) {
    const o = record(output.coin);
    return {
      type: OutputType.Coin,
      to: toB256(bytesOf(o.to)),
      amount: bn(toU64String(o.amount)),
      assetId: toB256(bytesOf(o.assetId)),
    };
  }
  if (output.contract) {
    const o = record(output.contract);
    return {
      type: OutputType.Contract,
      inputIndex: toNumber(o.inputIndex),
      balanceRoot: toB256(bytesOf(o.balanceRoot)),
      stateRoot: toB256(bytesOf(o.stateRoot)),
    };
  }
  if (output.change) {
    const o = record(output.change);
    return {
      type: OutputType.Change,
      to: toB256(bytesOf(o.to)),
      amount: bn(toU64String(o.amount)),
      assetId: toB256(bytesOf(o.assetId)),
    };
  }
  if (output.variable) {
    const o = record(output.variable);
    return {
      type: OutputType.Variable,
      to: toB256(bytesOf(o.to)),
      amount: bn(toU64String(o.amount)),
      assetId: toB256(bytesOf(o.assetId)),
    };
  }
  if (output.contractCreated) {
    const o = record(output.contractCreated);
    return {
      type: OutputType.ContractCreated,
      contractId: toB256(bytesOf(o.contractId)),
      stateRoot: toB256(bytesOf(o.stateRoot)),
    };
  }
  throw new Error(`unknown output oneof: ${Object.keys(output).join(',')}`);
}

function mapWitnesses(witnesses: unknown[] | undefined) {
  const list = witnesses ?? [];
  return list.map((w) => {
    const data = hexBytes(w);
    return { dataLength: hexLen(data), data };
  });
}

function mapIo(body: Record<string, unknown>) {
  const inputs = ((body.inputs as unknown[]) ?? []).map((i) =>
    mapInput(record(i)),
  );
  const outputs = ((body.outputs as unknown[]) ?? []).map((o) =>
    mapOutput(record(o)),
  );
  const witnesses = mapWitnesses(body.witnesses as unknown[] | undefined);
  const { policies, policyTypes } = mapPolicies(
    body.policies == null ? undefined : record(body.policies),
  );
  return {
    inputs,
    outputs,
    witnesses,
    witnessesCount: witnesses.length,
    policies,
    policyTypes,
    inputsCount: inputs.length,
    outputsCount: outputs.length,
  };
}

function zeroMutableFields(transaction: Transaction): void {
  if (transaction.type === TransactionType.Mint) {
    // fuel-tx's Mint::id() only calls input_contract.prepare_sign() and
    // output_contract.prepare_sign() (see fuel-tx transaction/types/mint.rs);
    // tx_pointer, mint_amount, mint_asset_id, gas_price, and both contractId/
    // inputIndex stay as-is.
    const t = transaction as any;
    if (t.inputContract) {
      t.inputContract = {
        ...t.inputContract,
        txID: ZeroBytes32,
        outputIndex: 0,
        balanceRoot: ZeroBytes32,
        stateRoot: ZeroBytes32,
        txPointer: { blockHeight: 0, txIndex: 0 },
      };
    }
    if (t.outputContract) {
      t.outputContract = {
        ...t.outputContract,
        balanceRoot: ZeroBytes32,
        stateRoot: ZeroBytes32,
      };
    }
    return;
  }
  if (transaction.type === TransactionType.Script) {
    transaction.receiptsRoot = ZeroBytes32;
  }
  transaction.inputs = (transaction.inputs ?? []).map((input) => {
    switch (input.type) {
      case InputType.Coin:
        return {
          ...input,
          txPointer: { blockHeight: 0, txIndex: 0 },
          predicateGasUsed: bn(0),
        };
      case InputType.Message:
        return { ...input, predicateGasUsed: bn(0) };
      case InputType.Contract:
        return {
          ...input,
          txPointer: { blockHeight: 0, txIndex: 0 },
          txID: ZeroBytes32,
          outputIndex: 0,
          balanceRoot: ZeroBytes32,
          stateRoot: ZeroBytes32,
        };
      default:
        return input;
    }
  });
  transaction.outputs = (transaction.outputs ?? []).map((output) => {
    switch (output.type) {
      case OutputType.Contract:
        return {
          ...output,
          balanceRoot: ZeroBytes32,
          stateRoot: ZeroBytes32,
        };
      case OutputType.Change:
        return { ...output, amount: bn(0) };
      case OutputType.Variable:
        return {
          ...output,
          to: ZeroBytes32,
          amount: bn(0),
          assetId: ZeroBytes32,
        };
      default:
        return output;
    }
  });
  transaction.witnessesCount = 0;
  transaction.witnesses = [];
}

export function toFuelsTransaction(
  protoTx: Record<string, unknown>,
): Transaction {
  const variant = txVariant(protoTx);
  const body = record(protoTx[variant]);
  switch (variant) {
    case 'script': {
      const script = hexBytes(body.script);
      const scriptData = hexBytes(body.scriptData);
      return {
        type: TransactionType.Script,
        scriptGasLimit: bn(toU64String(body.scriptGasLimit)),
        receiptsRoot: toB256(bytesOf(body.receiptsRoot)),
        scriptLength: bn(hexLen(script)),
        scriptDataLength: bn(hexLen(scriptData)),
        script,
        scriptData,
        ...mapIo(body),
      } as Transaction;
    }
    case 'create': {
      const slots = ((body.storageSlots as unknown[]) ?? []).map((s) => {
        const r = record(s);
        return { key: toB256(bytesOf(r.key)), value: toB256(bytesOf(r.value)) };
      });
      return {
        type: TransactionType.Create,
        bytecodeWitnessIndex: toNumber(body.bytecodeWitnessIndex),
        salt: toB256(bytesOf(body.salt)),
        storageSlotsCount: bn(slots.length),
        storageSlots: slots,
        ...mapIo(body),
      } as Transaction;
    }
    case 'mint': {
      const pointer = record(body.txPointer ?? {});
      const input = record(body.inputContract ?? {});
      const inUtxo = record(input.utxoId ?? {});
      const inPtr = record(input.txPointer ?? {});
      const output = record(body.outputContract ?? {});
      return {
        type: TransactionType.Mint,
        txPointer: {
          blockHeight: toNumber(pointer.blockHeight),
          txIndex: toNumber(pointer.txIndex),
        },
        inputContract: {
          txID: toB256(bytesOf(inUtxo.txId)),
          outputIndex: toNumber(inUtxo.outputIndex),
          balanceRoot: toB256(bytesOf(input.balanceRoot)),
          stateRoot: toB256(bytesOf(input.stateRoot)),
          txPointer: {
            blockHeight: toNumber(inPtr.blockHeight),
            txIndex: toNumber(inPtr.txIndex),
          },
          contractID: toB256(bytesOf(input.contractId)),
        },
        outputContract: {
          inputIndex: toNumber(output.inputIndex),
          balanceRoot: toB256(bytesOf(output.balanceRoot)),
          stateRoot: toB256(bytesOf(output.stateRoot)),
        },
        mintAmount: bn(toU64String(body.mintAmount)),
        mintAssetId: toB256(bytesOf(body.mintAssetId)),
        gasPrice: bn(toU64String(body.gasPrice)),
      } as Transaction;
    }
    case 'upgrade': {
      const purpose = record(body.purpose ?? {});
      const upgradePurpose = purpose.consensusParameters
        ? {
            type: UpgradePurposeTypeEnum.ConsensusParameters,
            data: {
              witnessIndex: toNumber(
                record(purpose.consensusParameters).witnessIndex,
              ),
              checksum: toB256(
                bytesOf(record(purpose.consensusParameters).checksum),
              ),
            },
          }
        : {
            type: UpgradePurposeTypeEnum.StateTransition,
            data: {
              bytecodeRoot: toB256(
                bytesOf(record(purpose.stateTransition ?? {}).root),
              ),
            },
          };
      return {
        type: TransactionType.Upgrade,
        upgradePurpose,
        ...mapIo(body),
      } as Transaction;
    }
    case 'upload': {
      const proofSet = ((body.proofSet as unknown[]) ?? []).map((p) =>
        toB256(bytesOf(p)),
      );
      return {
        type: TransactionType.Upload,
        root: toB256(bytesOf(body.root)),
        witnessIndex: toNumber(body.witnessIndex),
        subsectionIndex: toNumber(body.subsectionIndex),
        subsectionsNumber: toNumber(body.subsectionsNumber),
        proofSetCount: proofSet.length,
        proofSet,
        ...mapIo(body),
      } as Transaction;
    }
    case 'blob':
      return {
        type: TransactionType.Blob,
        blobId: toB256(bytesOf(body.blobId)),
        witnessIndex: toNumber(body.witnessIndex),
        ...mapIo(body),
      } as Transaction;
    default:
      throw new Error(`unhandled Transaction variant: ${variant}`);
  }
}

export function encodeRawPayload(tx: Transaction): string {
  return hexlify(new TransactionCoder().encode(tx));
}

// Decodes rawPayload instead of re-encoding `tx`; callers already need
// rawPayload for the `rawPayload` GraphQL field, so it is always available.
function cloneFromRawPayload(rawPayload: string): Transaction {
  const [decoded] = new TransactionCoder().decode(arrayify(rawPayload), 0);
  return decoded;
}

export function computeTxId(rawPayload: string, chainId: number): string {
  const clone = cloneFromRawPayload(rawPayload);
  zeroMutableFields(clone);
  const encoded = new TransactionCoder().encode(clone);
  return sha256(concat([uint64ToBytesBE(chainId), encoded]));
}
