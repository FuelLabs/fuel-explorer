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
import type { AssetInfo, TransactionNode } from '../types';

const fuelProvider = new Provider(FUEL_CHAIN.providerUrl);

function getAssetMetadata(
  transaction: TransactionNode,
  assetId: string,
  amount?: string,
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

  // api-lite prices amountInUsd per coin, for that coin's own amount. It
  // replaced the /convert_rate call that priced the amount actually being
  // displayed, so reusing a coin's value for a different amount is wrong: a
  // transfer's amount rarely equals the input coin it spent. Carry it over
  // only when a coin for this asset holds exactly `amount`; otherwise leave
  // the field off and the UI shows no USD rather than the wrong one.
  const priced = amount
    ? [...(transaction.inputs || []), ...(transaction.outputs || [])].find(
        (coin: any) =>
          coin.assetId === assetId && String(coin.amount) === amount,
      )
    : undefined;

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
    amountInUsd: (priced as any)?.amountInUsd,
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
      const asset = getAssetMetadata(
        transaction,
        assetSent.assetId!,
        assetSent.amount?.toString(),
      );
      if (asset) {
        assetSent.asset = asset;
      }
    });
  });
  return operations;
}
