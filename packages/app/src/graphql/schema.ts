import { loadSchema } from '@graphql-tools/load';
import { stitchSchemas } from '@graphql-tools/stitch';
import { UrlLoader } from '@graphql-tools/url-loader';
import {
  ExtenderResolvers,
  ExtenderTypeDefs,
} from '~/graphql/services/extender';
import { metadataSchema } from '~/graphql/services/metadata/schema';
import { createGraphqlFetch } from '~/graphql/utils';

export async function createSchema(fuelCoreGraphql: string) {
  return stitchSchemas({
    subschemas: [
      {
        // TODO: delete this once we start using local database or indexer
        // Load remote schame from Fuel Core
        schema: await loadSchema(fuelCoreGraphql, {
          loaders: [new UrlLoader()],
        }),
        executor: createGraphqlFetch(fuelCoreGraphql),
      },
      {
        schema: metadataSchema,
      },
    ],
    typeDefs: ExtenderTypeDefs,
    resolvers: ExtenderResolvers,
  });
}
