import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { BridgeContractLogsTable } from '~/domain/BridgeContractLog/BridgeContractLogModel';
import { BridgeContractLogRepository } from '~/domain/BridgeContractLog/BridgeContractLogRepository';
import {
  GQLBridgeContractLog,
  GQLQueryBridgeContractLogsArgs,
} from '~/graphql/generated/sdk';

type Source = GQLBridgeContractLog;
type Params = {
  bridgeContractLogs: GQLQueryBridgeContractLogsArgs;
};

class BridgeContractLogsResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly repository = new BridgeContractLogRepository(),
  ) {
    super();
    this.setResolvers({
      Query: {
        bridgeContractLogs: this.bridgeContractLogs.bind(this),
      },
    });
  }

  static create() {
    return new BridgeContractLogsResolver().getResolvers();
  }

  async bridgeContractLogs(_: Source, params: Params['bridgeContractLogs']) {
    const paginator = new Paginator(BridgeContractLogsTable, params);
    const transactions = await this.repository.findMany(params);
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);

    return paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }
}

export default BridgeContractLogsResolver.create();
