import { Hash256 } from '~/application/vo';
import type { GraphQLContext } from '../GraphQLContext';

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
    { repositories }: GraphQLContext,
  ) {
    const address = Hash256.create(params.query).value();
    const block = await repositories.block.findByHash(address);
    if (block) {
      return {
        block: block.toGQLNode(),
      };
    }

    const contract = await repositories.contract.findByHash(address);
    if (contract) {
      return {
        contract: contract.toGQLNode(),
      };
    }

    const transaction = await repositories.transaction.findByHash(address);
    if (transaction) {
      return {
        transaction: transaction.toGQLNode(),
      };
    }
  }
}
