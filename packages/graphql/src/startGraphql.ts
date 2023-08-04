import { createHandler } from "graphql-http/lib/use/express";
import {
  Kind,
  TypeInfo,
  buildClientSchema,
  buildSchema,
  execute,
  print,
  printSchema,
  visit,
} from "graphql";
import { Application } from "express";
import { getRemoteSchema } from "./utils/getRemoteSchema";
import { readFile } from "fs/promises";
import { join } from "path";
import { graphqlFetch } from "./utils/graphqlFetch";
import { exec } from "child_process";

const rootValue = {
  books: [
    {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      another: "asdasda",
    },
    {
      title: "The Wise Man's Fear",
      author: "Patrick Rothfuss",
    },
  ],
};

export async function startGraphql(remoteGraphql: string, app: Application) {
  const remoteIntrospect = await getRemoteSchema(remoteGraphql);
  const remoteSchema = buildClientSchema(remoteIntrospect);
  const remoteSchemaString = printSchema(remoteSchema);
  const extendSchemaString = await readFile(
    join(__dirname, "./schemas/custom.graphql"),
    "utf-8"
  );
  const schema = buildSchema(remoteSchemaString + "\n\n" + extendSchemaString);

  app.post(
    "/graphql",
    createHandler({
      schema,
      rootValue,
      execute: async (args) => {
        const remoteTypeInfo = new TypeInfo(remoteSchema);
        const extendTypeInfo = new TypeInfo(schema);

        const remoteQuery = visit(args.document, {
          enter(node) {
            remoteTypeInfo.enter(node);
            extendTypeInfo.enter(node);
          },
          leave(node, key, arent, path) {
            // undefined: no action
            // false: skip visiting this node
            // visitor.BREAK: stop visiting altogether
            // null: delete this node
            // any value: replace this node with the returned value
            let returnValue = undefined;

            if (node.kind === Kind.FIELD) {
              const remoteDef = remoteTypeInfo.getType();
              const extendDef = extendTypeInfo.getType();

              if (!remoteDef) {
                returnValue = null;
              }

              if (extendDef && !remoteDef) {
                console.log(extendDef);
                // console.log(extendTypeInfo.getParentType());
                // returnValue = [];
              }
            }

            remoteTypeInfo.leave(node);
            extendTypeInfo.leave(node);

            return returnValue;
          },
        });

        const result = graphqlFetch(
          remoteGraphql,
          print(remoteQuery),
          args.variableValues
        );
        const data = await result.then((resp) => resp.json());

        return data;
      },
    })
  );
}
