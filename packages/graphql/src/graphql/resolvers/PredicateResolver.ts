import PredicateDAO from '~/infra/dao/PredicateDAO';

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
  async predicate(_: any, params: Params['predicate']) {
    const predicateDAO = new PredicateDAO();
    const predicate = await predicateDAO.getByAddress(params.address);
    return predicate?.toGQLNode();
  }
}
