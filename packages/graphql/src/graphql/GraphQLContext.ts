import { GraphQLError } from 'graphql';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { ChainEntity } from '~/domain/Chain/ChainEntity';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import type { DbConnection } from '~/infra/database/Db';
import { type GraphQLSDK, client } from './GraphQLSDK';
import type { GQLChainInfo } from './generated/sdk-provider';

export type GraphQLContext = {
  chain: ChainEntity | null;
  client: GraphQLSDK;
  conn: DbConnection;
  repositories: {
    block: BlockRepository;
    transaction: TransactionRepository;
    contract: ContractRepository;
  };
};

export class GraphQLContextFactory {
  static async create(
    req: Request,
    conn: DbConnection,
    repositories: GraphQLContext['repositories'],
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
    const chainItem = res.data?.chain;
    if (!chainItem) {
      return { repositories, conn, client, chain: null };
    }
    const chain = ChainEntity.create(chainItem as GQLChainInfo);
    return { repositories, conn, client, chain };
  }

  static getRepositories(conn: DbConnection): GraphQLContext['repositories'] {
    return {
      block: new BlockRepository(conn),
      transaction: new TransactionRepository(conn),
      contract: new ContractRepository(conn),
    };
  }
}
