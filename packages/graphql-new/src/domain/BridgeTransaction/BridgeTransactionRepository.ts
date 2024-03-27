import { Paginator, PaginatorParams } from '~/core/Paginator';
import { BridgeTransactionsTable } from '~/infra/database/DbSchema';
import { BridgeTransactionEntity } from './BridgeTransactionEntity';

export class BridgeTransactionRepository {
  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BridgeTransactionsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const results = await paginator.getPaginatedResult(config);
    return results.map((item) => BridgeTransactionEntity.create(item));
  }
}
