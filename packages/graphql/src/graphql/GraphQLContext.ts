import { GraphQLError } from 'graphql';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { ChainEntity } from '~/domain/Chain/ChainEntity';
import type { DbConnection } from '~/infra/database/Db';
import { type GraphQLSDK, client } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk-provider';

export type GraphQLContext = {
  chain: ChainEntity | null;
  client: GraphQLSDK;
  conn: DbConnection;
};

export class GraphQLContextFactory {
  static async create(
    req: Request,
    conn: DbConnection,
  ): Promise<GraphQLContext> {
    logger.debugRequest('GraphQLContextFactory.create');
    const secret = env.get('SERVER_API_KEY');
    const bearer = `Bearer ${secret}`;
    const token = req.headers.get('Authorization');
    if (!token || token !== bearer) {
      logger.error('Authorization header is required');
      throw new GraphQLError('Authorization header is required');
    }

    const res = await client.sdk.chain();
    logger.debugResponse('GraphQLContextFactory.create', { res });
    const chainItem = res.data?.chain;
    if (!chainItem) {
      return { conn, client, chain: null };
    }
    const chain = ChainEntity.create(chainItem as GQLChainInfo);
    return { conn, client, chain };
  }
}
