import { join } from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { type DbConnection, db } from '~/infra/database/Db';
import { GraphQLContextFactory } from './GraphQLContext';
import { resolvers } from './resolvers';

const typesArray = loadFilesSync(join(__dirname, './schemas'));
const typeDefs = mergeTypeDefs(typesArray);

export class GraphQLServer {
  conn!: DbConnection;

  schema() {
    return makeExecutableSchema({ typeDefs, resolvers });
  }

  setup(schema: GraphQLSchema) {
    return createYoga({
      schema,
      logging: true,
      context: async ({ request }) => {
        if (this.conn) return GraphQLContextFactory.create(request, this.conn);
        const conn = await db.connection();
        this.conn = conn;
        return GraphQLContextFactory.create(request, conn);
      },
    });
  }
}
