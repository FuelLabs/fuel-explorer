import { Paginator, PaginatorParams } from '~/core/Paginator';
import { BridgeContractLogsTable } from '~/infra/database/DbSchema';
import { BridgeContractLogEntity } from './BridgeContractLogEntity';

export class BridgeContractLogRepository {
  async findMany(params: PaginatorParams) {
    const paginator = new Paginator(BridgeContractLogsTable, params);
    const config = await paginator.getQueryPaginationConfig();
    const results = await paginator.getPaginatedResult(config);
    return results.map((item) => BridgeContractLogEntity.create(item));
  }

  async insertMany() {
    console.log('@TODO: Implement it');
    return Promise.resolve();
  }
}
