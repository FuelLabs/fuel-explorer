import { env } from '~/config';
import { logger } from '~/core/Logger';
import { ChainEntity } from '~/domain/Chain/ChainEntity';
import { type GraphQLSDK, client } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk-provider';

export type GraphQLContext = {
  chain: ChainEntity | null;
  client: GraphQLSDK;
  isAuthenticated: boolean;
};

export class GraphQLContextFactory {
  static async create(req: Request): Promise<GraphQLContext> {
    logger.info('GraphQLContextFactory.create');
    let isAuthenticated = true;
    const secret = env.get('SERVER_API_KEY');
    const bearer = `Bearer ${secret}`;
    const token =
      req.headers.get('x-api-key') || req.headers.get('Authorization');
    if (!token || token !== bearer) {
      isAuthenticated = false;
    }

    const res = await client.sdk.chain();
    const chainItem = res.data?.chain;
    if (!chainItem) {
      return { client, chain: null, isAuthenticated };
    }
    const chain = ChainEntity.create(chainItem as GQLChainInfo);
    return { client, chain, isAuthenticated };
  }
}
