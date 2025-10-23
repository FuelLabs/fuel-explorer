import { bn } from 'fuels';
import { client } from '~/graphql/GraphQLSDK';
import { convertToUsd } from '~/infra/dao/utils';
import AssetGateway from '~/infra/gateway/AssetGateway';

export default class GetAccountAssets {
  async execute(input: Input): Promise<Output> {
    const assetGateway = new AssetGateway();
    const { data } = (await client.sdk.balances({
      filter: { owner: input.accountId },
      last: input.last,
    })) as any;
    const balances = data.balances;
    const { data: chainData } = await client.sdk.chain();
    const chainId = Number(chainData.chain.consensusParameters.chainId);
    const assets = [];
    for (const balance of balances.nodes) {
      const indexedAsset = await assetGateway.getAsset(
        balance.assetId,
        chainId,
      );
      const asset = indexedAsset
        ? Object.assign(balance, indexedAsset)
        : balance;
      asset.amountInUsd = asset.rate
        ? convertToUsd(asset.amount, asset.decimals, asset.rate).formatted
        : null;
      assets.push(asset);
    }
    const _assets = assets.filter((asset) => !bn(asset.amount).isZero());
    return {
      data: _assets,
      pageInfo: {
        count: _assets.length,
      },
    };
  }
}

type Input = {
  accountId: string;
  last: number;
};

type Output = {
  data: {
    assetId: string;
    contractId: string;
    amount: number;
    owner: string;
    symbol: string;
    icon: string;
    decimals: number;
    suspicious: boolean;
    verified: boolean;
    network: [];
  }[];
  pageInfo: {};
};
