import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { BlockDomain } from '~/entities/blocks/BlockDomain';
import { TransactionDomain } from '~/entities/transactions/TransactionDomain';

export type GraphQLContext = {};

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
    return {
      Query: {
        ...BlockDomain.getResolvers(),
        ...TransactionDomain.getResolvers(),
      },
    };
  }

  private _loadSchemas() {
    const fuelCorePath = this._schemasPath('fuelcore.graphql');
    const explorerPath = this._schemasPath('explorer.graphql');
    return [
      readFileSync(fuelCorePath).toString(),
      readFileSync(explorerPath).toString(),
    ].join('\n');
  }

  private _schemasPath(schemaFile: string) {
    return join(__dirname, '../../gql/schemas/', schemaFile);
  }
}
