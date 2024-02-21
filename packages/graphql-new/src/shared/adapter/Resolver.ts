import { IFieldResolver } from '@graphql-tools/utils';
import { GraphQLContext } from '~/infra/graphql/GraphQLServer';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Resolver<Source> = IFieldResolver<Source, GraphQLContext, any, any>;
type Resolvers<Source> = Record<string, Resolver<Source>>;

export interface ResolverInterface<S> {
  getResolvers(): ReturnType<ResolverAdapter<S>['getResolvers']>;
}

export class ResolverAdapter<S> {
  private resolvers: Resolvers<S> = {};

  setResolvers(resolvers: Resolvers<S>) {
    this.resolvers = resolvers;
  }

  getResolvers() {
    return this.resolvers;
  }
}
