import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import type { Executor } from '@graphql-tools/utils';

import fuelSchema from './schemas/fuelcore.graphql';
import { extendsResolvers, extendsTypeDefs } from './services/extends';
import { customSchema } from './services/metadata';

export function createSchema<F extends Executor<any>>(executor: F) {
  return stitchSchemas({
    subschemas: [
      {
        executor,
        // TODO: delete this once we start using local database or indexer
        // Load remote schame from Fuel Core
        schema: makeExecutableSchema({ typeDefs: fuelSchema }),
      },
      { schema: customSchema },
    ],
    typeDefs: extendsTypeDefs,
    resolvers: extendsResolvers,
  });
}
