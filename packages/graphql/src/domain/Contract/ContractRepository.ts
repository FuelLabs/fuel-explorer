import { eq } from 'drizzle-orm';
import { Paginator, type PaginatorParams } from '~/core/Paginator';
import type { GQLContract } from '~/graphql/generated/sdk';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { ContractEntity } from './ContractEntity';
import { ContractsTable } from './ContractModel';

export class ContractRepository {
  constructor(readonly conn: DbConnection | DbTransaction) {}

  async findByHash(id: string) {
    const [first] = await this.conn
      .select()
      .from(ContractsTable)
      .where(eq(ContractsTable.contractHash, id));

    if (!first) return null;
    return ContractEntity.create(first);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(ContractsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const query = await paginator.getPaginatedQuery(config);
    const results = paginator.getPaginatedResult(query);
    return results.map((item) => ContractEntity.create(item));
  }

  async insertMany(contracts: GQLContract[]) {
    const values = contracts.map(ContractEntity.toDBItem);
    const query = this.conn
      .insert(ContractsTable)
      .values(values)
      .onConflictDoNothing();

    const items = await query.returning();
    return items.map((item) => ContractEntity.create(item));
  }
}
