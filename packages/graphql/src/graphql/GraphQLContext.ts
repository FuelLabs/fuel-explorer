import { ChainEntity } from '~/domain/Chain/ChainEntity';
import { type GraphQLSDK, client } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk-provider';

export type GraphQLContext = {
  chain: ChainEntity | null;
  client: GraphQLSDK;
};

export class GraphQLContextFactory {
  static async create(): Promise<GraphQLContext> {
    const res = await client.sdk.chain();
    const chainItem = res.data?.chain;
    if (!chainItem) return { client, chain: null };
    const chain = ChainEntity.create(chainItem as GQLChainInfo);
    return { client, chain };
  }
}
