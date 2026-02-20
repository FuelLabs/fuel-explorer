import { concat, hash } from 'fuels';
import type { GQLOperationReceipt } from '~/graphql/generated/sdk-provider';
import TransactionDAO from '~/infra/dao/TransactionDAO';
import { convertToUsd } from '~/infra/dao/utils';
import AssetGateway from '~/infra/gateway/AssetGateway';

export default class GetTransaction {
  assetGateway: AssetGateway;

  constructor() {
    this.assetGateway = new AssetGateway();
  }

  async execute(id: string, chainId?: number, baseAssetId?: string) {
    const transactionDAO = new TransactionDAO();
    const transaction = await transactionDAO.getByHash(id);
    if (!transaction) return;
    if (chainId === undefined || chainId === null) {
      const output = transaction?.toGQLNode();
      return output;
    }
    for (const groupedInputs of transaction.groupedInputs) {
      if (!groupedInputs.inputs) continue;
      for (const input of groupedInputs.inputs) {
        if (input.__typename === 'InputCoin') {
          const asset = await this.assetGateway.getAsset(
            input.assetId,
            chainId,
          );
          this.mergeAssetProps(input, asset);
        }
      }
    }
    for (const output of transaction.data.outputs) {
      if (
        output &&
        (output.__typename === 'CoinOutput' ||
          output.__typename === 'ChangeOutput' ||
          output.__typename === 'VariableOutput')
      ) {
        const asset = await this.assetGateway.getAsset(output.assetId, chainId);
        this.mergeAssetProps(output, asset);
      }
    }
    for (const operation of transaction.operations) {
      if (!operation.receipts) continue;
      await this.parseOperationsR(operation.receipts, chainId);
    }
    if (transaction.data.isMint && transaction.data.mintAssetId) {
      const asset = await this.assetGateway.getAsset(
        transaction.data.mintAssetId,
        chainId,
      );

      transaction.data.mintedAsset = {
        __typename: 'Asset',
      };
      this.mergeAssetProps(transaction.data.mintedAsset, asset);
    }
    const output = transaction?.toGQLNode();
    if (baseAssetId && output.gasCosts?.fee) {
      const baseAsset = await this.assetGateway.getAsset(baseAssetId, chainId);
      if (baseAsset) {
        const feeInUsd = convertToUsd(
          output.gasCosts.fee,
          baseAsset.decimals,
          baseAsset.rate,
        );
        output.gasCosts.feeInUsd = feeInUsd?.formatted;
      }
    }
    return output;
  }

  mergeAssetProps(target: any, asset: Asset) {
    if (!asset) return;
    target.assetId = asset.assetId;
    target.name = asset.name;
    target.symbol = asset.symbol;
    target.icon = asset.icon;
    target.contractId = asset.contractId;
    target.decimals = asset.decimals;
    target.suspicious = asset.suspicious;
    target.rate = asset.rate;
    const usdAmount = convertToUsd(
      target.amount,
      Number(asset.decimals),
      asset.rate,
    );
    target.amountInUsd = usdAmount?.formatted;
  }

  async parseOperationsR(receipts: GQLOperationReceipt[], chainId: number) {
    if (!receipts) return;
    for (const receipt of receipts) {
      if (
        receipt.item &&
        receipt.item.receiptType === 'MINT' &&
        receipt.item.id &&
        receipt.item.subId
      ) {
        const assetId = hash(concat([receipt.item.id, receipt.item.subId]));
        const asset = await this.assetGateway.getAsset(assetId, chainId);
        this.mergeAssetProps(receipt.item, asset);
      }
      if (
        receipt.item &&
        receipt.item.receiptType === 'TRANSFER_OUT' &&
        receipt.item.assetId
      ) {
        const asset = await this.assetGateway.getAsset(
          receipt.item.assetId,
          chainId,
        );
        this.mergeAssetProps(receipt.item, asset);
      }
      if (receipt.receipts) {
        this.parseOperationsR(receipt.receipts, chainId);
      }
    }
  }
}

type Asset = {
  assetId: string;
  name: string;
  symbol: string;
  icon: string;
  contractId: string;
  decimals: string;
  suspicious: boolean;
  rate: number;
};
