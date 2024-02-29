import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { IResolvers } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { createYoga } from 'graphql-yoga';

export class GraphQLServer<R extends IResolvers<unknown, unknown>> {
  constructor(private resolvers: R) {}

  schema() {
    const typeDefs = this.loadSchemas();
    const { resolvers } = this;
    return stitchSchemas({
      subschemas: [{ schema: makeExecutableSchema({ typeDefs, resolvers }) }],
    });
  }

  setup(schema: GraphQLSchema) {
    return createYoga({ schema, logging: true });
  }

  private loadSchemas() {
    const fuelCorePath = this.schemasPath('fuelcore.graphql');
    const explorerPath = this.schemasPath('explorer.graphql');
    return [
      readFileSync(fuelCorePath).toString(),
      readFileSync(explorerPath).toString(),
    ].join('\n');
  }

  private schemasPath(schemaFile: string) {
    return join(__dirname, '../../application/schemas/', schemaFile);
  }
}
