import { ChainEntity } from '~/domain/Chain/ChainEntity';
import { GraphQLSDK } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk';

export type GraphQLContext = {
  chain: ChainEntity | null;
};

export class GraphQLContextFactory {
  static async create(): Promise<GraphQLContext> {
    const { sdk } = new GraphQLSDK();
    const res = await sdk.chain();
    const chainItem = res.data?.chain;
    if (!chainItem) return { chain: null };
    const chain = ChainEntity.create(chainItem as GQLChainInfo);
    return { chain };
  }
}
