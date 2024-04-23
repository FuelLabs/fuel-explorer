import { db } from '@core/db';
import type { GQLContract } from '@core/generated/gql-types';
import { Paginator, type PaginatorParams } from '@core/shared/Paginator';
import { eq } from 'drizzle-orm';
import { ContractEntity } from './ContractEntity';
import { ContractsTable } from './ContractModel';

export class ContractRepository {
  async findByHash(id: string) {
    const [first] = await db
      .connection()
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

  async insertOne(contract: GQLContract) {
    const [item] = await db
      .connection()
      .insert(ContractsTable)
      .values(ContractEntity.toDBItem(contract))
      .returning();

    return ContractEntity.create(item);
  }

  async insertMany(contracts: GQLContract[]) {
    return db.connection().transaction(async (trx) => {
      const queries = contracts.map(async (contract) => {
        const [item] = await trx
          .insert(ContractsTable)
          .values(ContractEntity.toDBItem(contract))
          .returning();

        return ContractEntity.create(item);
      });
      return Promise.all(queries.filter(Boolean));
    });
  }
}
