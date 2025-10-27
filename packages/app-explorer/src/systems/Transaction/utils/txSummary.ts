import { FUEL_CHAIN } from 'app-commons';
import {
  type GetTransactionSummaryParams,
  Provider,
  TransactionCoder,
  arrayify,
  bn,
  getOperations,
  processGqlReceipt,
} from 'fuels';
import type { OperationExtended } from '~/systems/Transaction/types';
import { convertAsset } from '../actions/convert-asset';
import type { AssetInfo, TransactionNode } from '../types';

const fuelProvider = new Provider(FUEL_CHAIN.providerUrl);

function getAssetMetadata(
  transaction: TransactionNode,
  assetId: string,
): AssetInfo | null {
  const assetInput = (transaction.inputs || []).find(
    (input) => (input as any).assetId === assetId,
  );
  const assetOutput = (transaction.outputs || []).find(
    (output) => (output as any).assetId === assetId,
  );

  if (!assetInput && !assetOutput) {
    return null;
  }

  const asset: AssetInfo = (assetInput || assetOutput) as any;
  return {
    assetId,
    decimals: asset.decimals,
    symbol: asset.symbol,
    name: asset.name,
    icon: asset.icon,
    contractId: asset.contractId,
    suspicious: asset.suspicious,
    verified: asset.verified,
  };
}

export async function createTransactionSummary(
  params: Omit<GetTransactionSummaryParams, 'id' | 'provider'> & {
    transaction: TransactionNode;
  },
): Promise<OperationExtended[]> {
  const provider = await fuelProvider;
  const { abiMap, transaction } = params;
  const [decodedTransaction] = new TransactionCoder().decode(
    arrayify(transaction.rawPayload),
    0,
  );
  const operations: OperationExtended[] = getOperations({
    transactionType: decodedTransaction.type,
    inputs: decodedTransaction.inputs || [],
    outputs: decodedTransaction.outputs || [],
    receipts:
      transaction.receipts?.map((r) => processGqlReceipt(r as any)) || [],
    rawPayload: transaction.rawPayload,
    abiMap,
    maxInputs: bn(1000),
    baseAssetId: await provider.getBaseAssetId(),
  });

  operations.map((op) => {
    op.calls?.map((call) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const asset = getAssetMetadata(transaction, call.assetId!);
      if (asset) {
        call.asset = asset;
      }
    });
    op.assetsSent?.map((assetSent) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const asset = getAssetMetadata(transaction, assetSent.assetId!);
      if (asset) {
        assetSent.asset = asset;
      }
    });
  });
  for (const operation of operations) {
    if (!operation.assetsSent) continue;
    for (const assetSent of operation.assetsSent) {
      if (!assetSent.asset) continue;
      const assetId = assetSent.asset.assetId || '';
      const amount = assetSent.amount.toString();
      const output = await convertAsset(assetId, amount);
      assetSent.asset.amountInUsd = output?.amount;
    }
  }
  return operations;
}
