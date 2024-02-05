import { GraphQLClient } from "graphql-request";

export function getClient(url: string) {
  return new GraphQLClient(url);
}
