import { ResolverAdapter } from '~/core/Resolver';
import { PredicateItem } from '~/domain/Predicate/PredicateModel';
import { PredicateRepository } from '~/domain/Predicate/PredicateRepository';

type Source = PredicateItem;
type Params = {
  predicate: { address: string };
};

export class PredicateResolver extends ResolverAdapter<Source> {
  constructor(
    private readonly predicateRepository = new PredicateRepository(),
  ) {
    super();
    this.setResolvers({
      predicate: this.predicate.bind(this),
    });
  }

  async predicate(_: Source, params: Params['predicate']) {
    const item = await this.predicateRepository.findByAddress(params.address);
    return item?.toGQLNode();
  }
}
