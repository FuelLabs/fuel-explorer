import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';

const typesArray = loadFilesSync(join(__dirname, './schemas'));
const typeDefs = mergeTypeDefs(typesArray);

export class GraphQLServer<R extends IResolvers<unknown, unknown>> {
  constructor(private resolvers: R) {}

  schema() {
    return makeExecutableSchema({
      typeDefs,
      resolvers: this.resolvers,
    });
  }

  setup(schema: GraphQLSchema) {
    return createYoga({ schema, logging: true });
  }
}
