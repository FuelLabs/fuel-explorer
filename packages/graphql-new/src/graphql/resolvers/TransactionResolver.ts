import { GasCosts } from '~/application/vo/GasCosts';
import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { GroupedInputsFactory } from '~/domain/Input/factories/GroupedInputsFactory';
import { GroupedOutputsFactory } from '~/domain/Output/factories/GroupedOutputsFactory';
import { TransactionsTable } from '~/domain/Transaction/TransactionModel';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import {
  GQLQueryTransactionArgs,
  GQLQueryTransactionsArgs,
  GQLQueryTransactionsByOwnerArgs,
  GQLTransaction,
} from '~/graphql/generated/sdk';
import { GraphQLContext } from '../GraphQLContext';

type Source = GQLTransaction;
type Params = {
  transaction: GQLQueryTransactionArgs;
  transactions: GQLQueryTransactionsArgs;
  transactionByOwner: GQLQueryTransactionsByOwnerArgs;
};

class TransactionResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly transactionRepository = new TransactionRepository(),
  ) {
    super();
    this.setResolvers({
      Query: {
        transaction: this.transaction.bind(this),
        transactions: this.transactions.bind(this),
        transactionsByOwner: this.transactionsByOwner.bind(this),
      },
      Transaction: {
        gasCosts: this.gasCosts.bind(this),
        groupedInputs: this.groupedInputs.bind(this),
        groupedOutputs: this.groupedOutputs.bind(this),
      },
    });
  }

  static create() {
    return new TransactionResolver().getResolvers();
  }

  async transaction(_: Source, params: Params['transaction']) {
    const item = await this.transactionRepository.findByHash(params.id);
    return item?.toGQLNode() ?? null;
  }

  async transactions(_: Source, params: Params['transactions']) {
    const paginator = new Paginator(TransactionsTable, params);
    const transactions = await this.transactionRepository.findMany(params);
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    return paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }

  async transactionsByOwner(_: Source, params: Params['transactionByOwner']) {
    const paginator = new Paginator(TransactionsTable, params);
    const transactions = await this.transactionRepository.findByOwner(params);
    const startCursor = paginator.getStartCursor(transactions);
    const endCursor = paginator.getEndCursor(transactions);
    return paginator.createPaginatedResult(
      transactions,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }

  async gasCosts(source: Source, _: unknown, ctx: GraphQLContext) {
    if (!ctx.chain) throw new Error('Chain not found');
    return GasCosts.create(source, ctx.chain?.data).toGQL();
  }

  async groupedInputs(source: Source) {
    return GroupedInputsFactory.create(source.inputs).value();
  }

  async groupedOutputs(source: Source) {
    return GroupedOutputsFactory.create(source.outputs).value();
  }
}

export default TransactionResolver.create();
