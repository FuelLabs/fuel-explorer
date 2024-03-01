import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';

const typesArray = loadFilesSync(join(__dirname, './schemas'));
const typeDefs = mergeTypeDefs(typesArray);
const resolversArray = loadFilesSync(join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

export class GraphQLServer {
  schema() {
    return makeExecutableSchema({ typeDefs, resolvers });
  }

  setup(schema: GraphQLSchema) {
    return createYoga({ schema, logging: true });
  }
}
