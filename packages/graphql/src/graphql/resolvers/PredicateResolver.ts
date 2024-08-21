import type { PredicateItem } from '~/domain/Predicate/PredicateModel';
import PredicateDAO from '~/infra/dao/PredicateDAO';

type Source = PredicateItem;
type Params = {
  predicate: { address: string };
};

export class PredicateResolver {
  static create() {
    const resolvers = new PredicateResolver();
    return {
      Query: {
        predicate: resolvers.predicate,
      },
    };
  }

  // TODO: index data to Postgres instead of fetch from SDK
  async predicate(_: Source, params: Params['predicate']) {
    const predicateDAO = new PredicateDAO();
    const predicate = await predicateDAO.getByAddress(params.address);
    return predicate?.toGQLNode();
  }
}
