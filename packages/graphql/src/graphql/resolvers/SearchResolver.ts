import { Hash256 } from '~/application/vo';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import BlockDAO from '~/infra/dao/BlockDAO';
import ContractDAO from '~/infra/dao/ContractDAO';
import TransactionDAO from '~/infra/dao/TransactionDAO';

type Params = {
  search: { query: string };
};

export class SearchResolver {
  static create() {
    const resolvers = new SearchResolver();
    return {
      Query: {
        search: resolvers.search,
      },
    };
  }

  async search(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    _null: any,
    params: Params['search'],
  ) {
    const address = Hash256.create(params.query).value();
    const blockDAO = new BlockDAO();
    const block = await blockDAO.getByHash(address);
    if (block) {
      return {
        block: block.toGQLNode(),
      };
    }

    const contractDAO = new ContractDAO();
    const contract = await contractDAO.getByHash(address);
    if (contract) {
      return {
        contract: contract.toGQLNode(),
      };
    }

    const transactionDAO = new TransactionDAO();
    const transaction = await transactionDAO.getByHash(address);
    if (transaction) {
      return {
        transaction: transaction.toGQLNode(),
      };
    }
    const transactions = await transactionDAO.getTransactionsByOwner(address);
    if (transactions.length > 0) {
      return {
        account: {
          address,
          transactions: transactions.map((transaction: TransactionEntity) =>
            transaction.toGQLNode(),
          ),
        },
      };
    }
  }
}
