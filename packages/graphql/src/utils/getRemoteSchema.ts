import { IntrospectionQuery, getIntrospectionQuery } from "graphql";
import { graphqlFetch } from "./graphqlFetch";

export function getRemoteSchema(url: string): Promise<IntrospectionQuery> {
  return graphqlFetch(url, getIntrospectionQuery())
    .then((resp) => resp.json())
    .then((r) => r.data)
    .catch((error) => {
      throw Error(`Can't get introspection from ${url}:\n${error.message}`);
    });
}
