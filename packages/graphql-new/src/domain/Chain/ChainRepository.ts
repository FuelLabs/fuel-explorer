import { desc, eq } from 'drizzle-orm';
import { Paginator, PaginatorParams } from '~/core/Paginator';
import { GraphQLSDK } from '~/graphql/GraphQLSDK';
import { GQLChainInfo } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { ChainEntity } from './ChainEntity';
import { ChainsTable } from './ChainModel';

export class ChainRepository {
  async findById(id: number) {
    const [first] = await db
      .connection()
      .select()
      .from(ChainsTable)
      .where(eq(ChainsTable._id, id));
    if (!first) return null;
    return ChainEntity.create(first);
  }

  async findLatestAdded() {
    const [latest] = await db
      .connection()
      .select()
      .from(ChainsTable)
      .orderBy(desc(ChainsTable._id))
      .limit(1);

    if (!latest) {
      throw new Error('No chain found on database.');
    }

    return ChainEntity.create(latest);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(ChainsTable, params);
    const results = await paginator.getPaginatedResult();
    return results.map((item) => ChainEntity.create(item));
  }

  async insertOne(chain: GQLChainInfo) {
    const found = await this.findById(Number(chain.daHeight));
    if (found) return;

    const [item] = await db
      .connection()
      .insert(ChainsTable)
      .values(ChainEntity.toDBItem(chain))
      .returning();

    return ChainEntity.create(item);
  }

  async insertMany(chains: GQLChainInfo[]) {
    return db.connection().transaction(async (trx) => {
      const queries = chains.map(async (chain) => {
        const [item] = await trx
          .insert(ChainsTable)
          .values(ChainEntity.toDBItem(chain))
          .returning();

        return ChainEntity.create(item);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }

  async chainInfoFromNode() {
    const { sdk } = new GraphQLSDK();
    const { data } = await sdk.chain();
    return data.chain as GQLChainInfo;
  }
}
