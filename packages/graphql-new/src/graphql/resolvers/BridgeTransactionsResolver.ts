import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { BridgeTransactionsTable } from '~/domain/BridgeTransaction/BridgeTransactionModel';
import { BridgeTransactionRepository } from '~/domain/BridgeTransaction/BridgeTransactionRepository';
import {
  GQLBridgeTransaction,
  GQLQueryBridgeTransactionsArgs,
} from '~/graphql/generated/sdk';

type Source = GQLBridgeTransaction;
type Params = {
  bridgeTransactions: GQLQueryBridgeTransactionsArgs;
};

class BridgeTransactionsResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly repository = new BridgeTransactionRepository(),
  ) {
    super();
    this.setResolvers({
      Query: {
        bridgeTransactions: this.bridgeTransactions.bind(this),
      },
    });
  }

  static create() {
    return new BridgeTransactionsResolver().getResolvers();
  }

  async bridgeTransactions(_: Source, params: Params['bridgeTransactions']) {
    const paginator = new Paginator(BridgeTransactionsTable, params);
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

export default BridgeTransactionsResolver.create();
