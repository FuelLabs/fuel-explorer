import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { BlockDomain } from '../domains/BlockDomain';
import { TransactionDomain } from '../domains/TransactionDomain';

export type Context = {};

export class GraphQLServer {
  schema() {
    const typeDefs = this._loadSchemas();
    const resolvers = this._createResolvers();
    return stitchSchemas({
      subschemas: [{ schema: makeExecutableSchema({ typeDefs, resolvers }) }],
    });
  }

  setup(schema: GraphQLSchema) {
    return createYoga({ schema, logging: true });
  }

  private _createResolvers() {
    const blockDomain = new BlockDomain();
    const transactionDomain = new TransactionDomain();
    return {
      Query: {
        ...blockDomain.createResolvers().Query,
        ...transactionDomain.createResolvers().Query,
      },
    };
  }

  private _loadSchemas() {
    const fuelCorePath = join(__dirname, '../gql/schemas/fuelcore.graphql');
    const explorerPath = join(__dirname, '../gql/schemas/explorer.graphql');
    return [
      readFileSync(fuelCorePath).toString(),
      readFileSync(explorerPath).toString(),
    ].join('\n');
  }
}
