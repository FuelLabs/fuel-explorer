import { GraphQLClient } from 'graphql-request';
import { env } from '~/config';
import { getSdk } from '~/graphql/generated/sdk-provider';

export type GQLClient = ReturnType<typeof getSdk>;

export class GraphQLSDK {
  client: GraphQLClient;
  sdk: ReturnType<typeof getSdk>;

  constructor() {
    const provider = env.get('FUEL_PROVIDER');
    if (!provider) {
      throw new Error('Missing FUEL_PROVIDER');
    }
    this.client = new GraphQLClient(provider);
    this.sdk = getSdk(this.client);
  }
}

export const client = new GraphQLSDK();
