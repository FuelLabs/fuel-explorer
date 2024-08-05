import { GraphQLClient } from 'graphql-request';
import { env } from '~/config';
import { getSdk } from '~/graphql/generated/sdk-provider';

export type GQLClient = ReturnType<typeof getSdk>;

export class GraphQLSDK {
  client: GraphQLClient;
  sdk: ReturnType<typeof getSdk>;

  constructor() {
    this.client = new GraphQLClient(env.get('FUEL_PROVIDER'));
    this.sdk = getSdk(this.client);
  }
}

export const client = new GraphQLSDK();
