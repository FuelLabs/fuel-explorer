import { env } from '~/config';
import { ChainEntity } from '~/domain/Chain/ChainEntity';
import DataCache from '~/infra/cache/DataCache';
import { type GraphQLSDK, client } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk-provider';

export type GraphQLContext = {
  chain: ChainEntity | null;
  client: GraphQLSDK;
  isAuthenticated: boolean;
};

export class GraphQLContextFactory {
  static async create(req: Request): Promise<GraphQLContext> {
    let isAuthenticated = true;
    const secret = env.get('SERVER_API_KEY');
    const bearer = `Bearer ${secret}`;
    const token =
      req.headers.get('x-api-key') || req.headers.get('Authorization');
    if (!token || token !== bearer) {
      isAuthenticated = false;
    }

    // Cache chain info to avoid fetching on every request
    let chainEntity = DataCache.getInstance().get('chainInfo');
    if (!chainEntity) {
      const res = await client.sdk.chain();
      const chainItem = res.data?.chain;
      if (!chainItem) {
        return { client, chain: null, isAuthenticated };
      }
      chainEntity = ChainEntity.create(chainItem as GQLChainInfo);
      DataCache.getInstance().save('chainInfo', 10 * 60 * 1000, chainEntity);
    }

    return { client, chain: chainEntity, isAuthenticated };
  }
}
