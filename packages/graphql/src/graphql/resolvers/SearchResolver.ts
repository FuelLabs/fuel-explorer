import { Hash256 } from '~/application/vo';
import { ResolverAdapter } from '~/core/Resolver';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import type { GraphQLContext } from '../GraphQLContext';

type Params = {
  search: { query: string };
};

export class SearchResolver extends ResolverAdapter<null> {
  private constructor() {
    super();
    this.setResolvers({
      Query: {
        search: this.search.bind(this),
      },
    });
  }

  static create() {
    return new SearchResolver().getResolvers();
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async search(_null: any, params: Params['search'], { conn }: GraphQLContext) {
    const address = Hash256.create(params.query).value();
    const blockRepository = new BlockRepository(conn);
    const contractRepository = new ContractRepository(conn);
    const transactionRepository = new TransactionRepository(conn);
    const block = await blockRepository.findByHash(address);
    if (block) {
      return {
        block: block.toGQLNode(),
      };
    }

    const contract = await contractRepository.findByHash(address);
    if (contract) {
      return {
        contract: contract.toGQLNode(),
      };
    }

    const transaction = await transactionRepository.findByHash(address);
    if (transaction) {
      return {
        transaction: transaction.toGQLNode(),
      };
    }
  }
}
