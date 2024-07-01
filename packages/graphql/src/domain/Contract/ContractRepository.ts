import { logger } from '~/core/Logger';
import type { Paginator } from '~/core/Paginator';
import type { GQLContract } from '~/graphql/generated/sdk-provider';
import type { DbConnection, DbTransaction } from '~/infra/database/Db';
import { ContractEntity } from './ContractEntity';
import { ContractsTable } from './ContractModel';
import {
  ContractStatements,
  type ContractStatementsItem,
} from './ContractStatements';

export class ContractRepository {
  statements!: ContractStatementsItem;
  constructor(readonly conn: DbConnection | DbTransaction) {
    const statements = new ContractStatements(conn);
    this.statements = statements.build();
  }

  async findByHash(id: string) {
    logger.debugRequest('ContractRepository.findByHash', { id });
    const first = await this.statements.findByHash.execute({
      contractHash: id,
    });
    logger.debugResponse('ContractRepository.findByHash', { first });
    if (!first) return null;
    return ContractEntity.create(first);
  }

  async findMany(paginator: Paginator<typeof ContractsTable>) {
    logger.debugRequest('ContractRepository.findMany', { paginator });
    const statement = this.statements.findMany(paginator);
    const contracts = await statement.execute();
    logger.debugResponse('ContractRepository.findMany', { contracts });
    return contracts.map(ContractEntity.create);
  }

  async insertMany(contracts: GQLContract[]) {
    const values = contracts.map(ContractEntity.toDBItem);
    await this.conn.insert(ContractsTable).values(values).onConflictDoNothing();
  }
}
