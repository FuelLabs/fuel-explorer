import { ResolverAdapter } from '~/core/Resolver';
import type { PredicateItem } from '~/domain/Predicate/PredicateModel';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';
import type { GraphQLContext } from '../GraphQLContext';

type Source = PredicateItem;
type Params = {
  predicate: { address: string };
};

export class PredicateResolver extends ResolverAdapter<Source> {
  private constructor() {
    super();
    this.setResolvers({
      Query: {
        predicate: this.predicate.bind(this),
      },
    });
  }

  static create() {
    return new PredicateResolver().getResolvers();
  }

  async predicate(
    _: Source,
    params: Params['predicate'],
    { conn }: GraphQLContext,
  ) {
    const predicateRepository = new PredicateRepository(conn);
    const item = await predicateRepository.findByAddress(params.address);
    return item?.toGQLNode();
  }
}
