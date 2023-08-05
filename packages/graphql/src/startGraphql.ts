import { createHandler } from "graphql-http/lib/use/express";
import { Application } from "express";
import { stitchSchemas } from "@graphql-tools/stitch";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";

import { createGraphqlFetch } from "~/utils";
import { metadataSchema } from "~/services/metadata/schema";
import { ExtenderResolvers, ExtenderTypeDefs } from "~/services/extender";

async function createSchema(fuelCoreGraphql: string) {
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

export async function startGraphql(fuelCoreGraphql: string, app: Application) {
  const schema = await createSchema(fuelCoreGraphql);
  app.post(
    "/graphql",
    createHandler({
      schema,
    })
  );
}
