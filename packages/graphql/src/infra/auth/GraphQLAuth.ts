import { GraphQLError } from 'graphql';
import { GraphQLContext } from '~/graphql/GraphQLContext';

export default class GraphQLAuth {
  static apply(resolvers: any) {
    for (const resolver in resolvers) {
      resolvers[resolver] = GraphQLAuth.auth(resolvers[resolver]);
    }
    return resolvers;
  }

  static auth(fn: Function) {
    return (_: any, params: any, context: GraphQLContext) => {
      if (!context.isAuthenticated) {
        throw new GraphQLError('Authorization header is required');
      }
      return fn(_, params, context);
    };
  }
}
