import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';

import fuelSchema from './schemas/fuelcore.graphql';
import { ExtenderResolvers, ExtenderTypeDefs } from './services/extender';
import { metadataSchema } from './services/metadata';
import { createGraphqlFetch } from './utils';

export function createSchema(fuelCoreGraphql: string) {
  return stitchSchemas({
    subschemas: [
      {
        // TODO: delete this once we start using local database or indexer
        // Load remote schame from Fuel Core
        schema: makeExecutableSchema({ typeDefs: fuelSchema }),
        executor: createGraphqlFetch(fuelCoreGraphql),
      },
      { schema: metadataSchema },
    ],
    typeDefs: ExtenderTypeDefs,
    resolvers: ExtenderResolvers,
  });
}
