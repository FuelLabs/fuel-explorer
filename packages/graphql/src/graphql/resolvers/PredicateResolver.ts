import { logger } from '~/core/Logger';
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

  async predicate(_: any, params: Params['predicate']) {
    logger.debug('GraphQL', 'PredicateResolver.predicate');
    const predicateDAO = new PredicateDAO();
    const predicate = await predicateDAO.getByAddress(params.address);
    if (!predicate || predicate.bytecode === '0x') return;
    return predicate.toGQLNode();
  }
}
