import { env } from '~/config';
import { ChainEntity } from '~/domain/Chain/ChainEntity';
import { type GraphQLSDK, client } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk-provider';

export type GraphQLContext = {
  chain: ChainEntity | null;
  client: GraphQLSDK;
};

export class GraphQLContextFactory {
  static async create(req: Request): Promise<GraphQLContext> {
    const secret = env.get('SERVER_API_KEY');
    const bearer = `Bearer ${secret}`;
    const token = req.headers.get('Authorization');
    console.log('token', token);

    if (!token || token !== bearer) {
      throw new Error('Authorization header is required');
    }

    const res = await client.sdk.chain();
    const chainItem = res.data?.chain;
    if (!chainItem) return { client, chain: null };
    const chain = ChainEntity.create(chainItem as GQLChainInfo);
    return { client, chain };
  }
}
