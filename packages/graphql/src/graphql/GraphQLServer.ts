import { join } from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { GraphQLContextFactory } from './GraphQLContext';

const typesArray = loadFilesSync(join(process.cwd(), 'src/graphql/schemas'));
const typeDefs = mergeTypeDefs(typesArray);
const resolversArray = loadFilesSync(
  join(process.cwd(), 'src/graphql/resolvers'),
);
const resolvers = mergeResolvers(resolversArray);

export class GraphQLServer {
  schema() {
    return makeExecutableSchema({ typeDefs, resolvers });
  }

  setup(schema: GraphQLSchema) {
    return createYoga({
      schema,
      logging: true,
      context: async ({ request }) => {
        return GraphQLContextFactory.create(request);
      },
    });
  }
}
