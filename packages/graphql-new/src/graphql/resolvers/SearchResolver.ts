import { HashID } from '~/application/vo';
import { ResolverAdapter } from '~/core/Resolver';
import { BlockRepository } from '~/domain/Block/BlockRepository';
import { ContractRepository } from '~/domain/Contract/ContractRepository';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';

type Params = {
  search: { query: string };
};

class SearchResolver extends ResolverAdapter<null> {
  private constructor(
    private readonly transactionRepository = new TransactionRepository(),
    private readonly contractRepository = new ContractRepository(),
    private readonly blockRepository = new BlockRepository(),
  ) {
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

  async search(_: null, params: Params['search']) {
    const address = HashID.create(params.query).value();
    const block = await this.blockRepository.findById(address);
    if (block) {
      return {
        block: block.toGQLNode(),
      };
    }

    const contract = await this.contractRepository.findById(address);
    if (contract) {
      return {
        contract: contract.toGQLNode(),
      };
    }

    const transaction = await this.transactionRepository.findById(address);
    if (transaction) {
      return {
        transaction: transaction.toGQLNode(),
      };
    }
  }
}

export default SearchResolver.create();
