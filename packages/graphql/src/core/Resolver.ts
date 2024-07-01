import type { IResolvers } from '@graphql-tools/utils';
import type { GraphQLContext } from '~/graphql/GraphQLContext';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Resolvers<Source> = IResolvers<Source, GraphQLContext, any, any>;

export class ResolverAdapter<S> {
  private resolvers: Resolvers<S> = {};

  setResolvers(resolvers: Resolvers<S>) {
    this.resolvers = resolvers;
  }

  getResolvers() {
    return this.resolvers;
  }
}
