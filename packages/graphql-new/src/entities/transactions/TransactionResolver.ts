import { GQLTransaction } from '~/generated/types';
import { ResolverAdapter, ResolverInterface } from '~/shared/adapter/Resolver';
import { PaginatorParams } from '~/shared/service';
import { PaginatedResults } from '~/shared/service/Paginator';
import { TransactionDomain } from './TransactionDomain';
import { TransactionItem } from './TransactionModel';
import { TransactionRepository } from './TransactionRepository';

type Source = GQLTransaction;
type Params = {
  transaction: { id: string };
  transactions: PaginatorParams;
  transactionsByOwner: PaginatorParams & { owner: string };
};

export class TransactionResolver implements ResolverInterface<Source> {
  private adapter: ResolverAdapter<Source> = new ResolverAdapter();
  private repository: TransactionRepository = new TransactionRepository();

  constructor() {
    this.adapter.setResolvers({
      transaction: this.transaction.bind(this),
      transactions: this.transactions.bind(this),
      transactionsByOwner: this.transactionsByOwner.bind(this),
    });
  }

  getResolvers() {
    return this.adapter.getResolvers();
  }

  async transaction(_: Source, { id }: Params['transaction']) {
    const res = await this.repository.findById(id);
    return this._parseOne(res);
  }

  async transactions(_: Source, params: Params['transactions']) {
    const res = await this.repository.findMany(params);
    return this._parseMany(res);
  }

  async transactionsByOwner(_: Source, params: Params['transactionsByOwner']) {
    const res = await this.repository.findByOwner(params.owner, params);
    return this._parseMany(res);
  }

  private _parseOne(result: TransactionItem | null) {
    return result?.data;
  }

  private _parseMany(result: PaginatedResults<TransactionItem>) {
    return {
      ...result,
      nodes: result.nodes.map((item) => {
        const domain = new TransactionDomain(item);
        console.log(domain.getInternalId());
        return {
          ...item,
          ...item.data,
        };
      }),
    };
  }
}
