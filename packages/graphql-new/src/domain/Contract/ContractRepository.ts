import { eq } from 'drizzle-orm';
import { Paginator, PaginatorParams } from '~/core/Paginator';
import { GQLContract } from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';
import { ContractEntity } from './ContractEntity';
import { ContractsTable } from './ContractModel';

export class ContractRepository {
  async findById(id: string) {
    const [first] = await db
      .connection()
      .select()
      .from(ContractsTable)
      .where(eq(ContractsTable.contractId, id));

    if (!first) return null;
    return ContractEntity.create(first);
  }

  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(ContractsTable, params);
    const results = await paginator.getPaginatedResult();
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
