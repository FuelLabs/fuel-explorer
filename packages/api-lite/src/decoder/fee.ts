import {
  type BN,
  PolicyType,
  type Transaction,
  TransactionType,
  arrayify,
  bn,
  calculateMetadataGasForTxBlob,
  calculateMetadataGasForTxCreate,
  calculateMetadataGasForTxScript,
  calculateMetadataGasForTxUpgrade,
  calculateMetadataGasForTxUpload,
} from 'fuels';
import type { GQLReceiptOut } from './receipts';

export type FeeParams = {
  gasPriceFactor: string;
  gasPerByte: string;
  gasCosts: unknown;
  maxGasPerTx: string;
};

function ceilDiv(a: BN, d: BN): BN {
  return a.add(d.sub(1)).div(d);
}

// Mirrors fuels' resolveGasDependentCosts (not exported by the `fuels` package).
function resolveDependentCost(byteSize: number | BN, cost: any): BN {
  const base = bn(cost.base);
  const size = bn(byteSize);
  return 'unitsPerGas' in cost
    ? base.add(size.div(bn(cost.unitsPerGas)))
    : base.add(size.mul(bn(cost.gasPerUnit)));
}

// fuels' own getMinGas()/gasUsedByInputs() charges gasCosts.ecr1 (secp256r1) for
// every uniquely-witnessed signed Coin/Message input. fuel-core's real rule
// (fuel-tx::transaction::fee::Chargeable::gas_used_by_inputs, matched on
// CoinSigned/MessageCoinSigned/MessageDataSigned) charges gasCosts.eck1
// (secp256k1) instead. That single field name is the entire gap between our
// minGas and mainnet's — reimplemented here rather than patched upstream.
function gasUsedByInputs(
  inputs: any[],
  txBytesSize: number,
  gasCosts: any,
): BN {
  const seenWitness = new Set<number>();
  let total = bn(0);
  for (const input of inputs) {
    const isCoinOrMessage = 'owner' in input || 'sender' in input;
    if (!isCoinOrMessage) continue;
    const hasPredicate =
      'predicate' in input && input.predicate && input.predicate !== '0x';
    if (hasPredicate) {
      const vmInitializationCost = resolveDependentCost(
        txBytesSize,
        gasCosts.vmInitialization,
      );
      const contractRootCost = resolveDependentCost(
        arrayify(input.predicate).length,
        gasCosts.contractRoot,
      );
      total = total
        .add(vmInitializationCost)
        .add(contractRootCost)
        .add(bn(input.predicateGasUsed ?? 0));
    } else if (!seenWitness.has(input.witnessIndex)) {
      seenWitness.add(input.witnessIndex);
      total = total.add(bn(gasCosts.eck1));
    }
  }
  return total;
}

function getMinGas(params: {
  gasCosts: any;
  gasPerByte: BN;
  inputs: any[];
  metadataGas: BN;
  txBytesSize: number;
}): BN {
  const { gasCosts, gasPerByte, inputs, metadataGas, txBytesSize } = params;
  const vmInitGas = resolveDependentCost(
    txBytesSize,
    gasCosts.vmInitialization,
  );
  const bytesGas = bn(txBytesSize).mul(gasPerByte);
  const inputsGas = gasUsedByInputs(inputs, txBytesSize, gasCosts);
  return vmInitGas.add(bytesGas).add(inputsGas).add(metadataGas);
}

function metadataGas(tx: Transaction, txBytesSize: number, gasCosts: any): BN {
  switch (tx.type) {
    case TransactionType.Script:
      return calculateMetadataGasForTxScript({ gasCosts, txBytesSize });
    case TransactionType.Create:
      return calculateMetadataGasForTxCreate({
        gasCosts,
        txBytesSize,
        contractBytesSize: bn(
          arrayify(
            (tx as any).witnesses?.[(tx as any).bytecodeWitnessIndex]?.data ??
              '0x',
          ).length,
        ),
        stateRootSize: (tx as any).storageSlots?.length ?? 0,
      });
    case TransactionType.Upgrade:
      return calculateMetadataGasForTxUpgrade({
        gasCosts,
        txBytesSize,
        consensusSize: 0,
      });
    case TransactionType.Upload:
      return calculateMetadataGasForTxUpload({
        gasCosts,
        txBytesSize,
        subsectionSize: 0,
        subsectionsSize: (tx as any).subsectionsNumber ?? 0,
      });
    case TransactionType.Blob:
      return calculateMetadataGasForTxBlob({
        gasCosts,
        txBytesSize,
        witnessBytesSize: 0,
      });
    default:
      return bn(0);
  }
}

export function computeGasAndFee(
  tx: Transaction,
  rawPayload: string,
  receipts: GQLReceiptOut[],
  gasPrice: string,
  params: FeeParams,
): { totalGas: string; totalFee: string } {
  if (tx.type === TransactionType.Mint) return { totalGas: '0', totalFee: '0' };
  const txBytesSize = arrayify(rawPayload).length;
  const gasCosts = params.gasCosts as any;
  const minGas = getMinGas({
    gasCosts,
    gasPerByte: bn(params.gasPerByte),
    inputs: (tx as any).inputs ?? [],
    metadataGas: metadataGas(tx, txBytesSize, gasCosts),
    txBytesSize,
  });
  const scriptResult = [...receipts]
    .reverse()
    .find((r) => r.receiptType === 'SCRIPT_RESULT');
  const gasUsed = bn(scriptResult?.gasUsed ?? '0');
  const totalGas = minGas.add(gasUsed);
  const tip = bn(
    (tx as any).policies?.find(
      (p: { type: number }) => p.type === PolicyType.Tip,
    )?.data ?? 0,
  );
  const totalFee = ceilDiv(
    totalGas.mul(bn(gasPrice)),
    bn(params.gasPriceFactor),
  ).add(tip);
  return { totalGas: totalGas.toString(), totalFee: totalFee.toString() };
}
