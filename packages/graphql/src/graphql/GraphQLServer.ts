import { join } from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import { createYoga, useLogger } from 'graphql-yoga';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { type DbConnection, db } from '~/infra/database/Db';
import { GraphQLContextFactory } from './GraphQLContext';
import { resolvers } from './resolvers';

const DEBUG = env.get('DEBUG');
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
      batching: true,
      logging: DEBUG,
      maskedErrors: DEBUG,
      context: async ({ request }) => {
        if (this.conn) return GraphQLContextFactory.create(request, this.conn);
        const conn = await db.connection();
        this.conn = conn;
        return GraphQLContextFactory.create(request, conn);
      },
      plugins: [
        useLogger({
          logFn: (eventName, args) => logger.yogaLogFn(eventName, args),
        }),
      ],
    });
  }
}
