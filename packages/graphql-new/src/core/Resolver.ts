import { IResolvers } from '@graphql-tools/utils';
import { GraphQLContext } from '~/graphql/GraphQLContext';

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
