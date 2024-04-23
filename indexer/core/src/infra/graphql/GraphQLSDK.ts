import { env } from '@core/config';
import { getSdk } from '@core/generated/sdk';
import { GraphQLClient } from 'graphql-request';

export type GQLClient = ReturnType<typeof getSdk>;

export class GraphQLSDK {
  client: GraphQLClient;
  sdk: ReturnType<typeof getSdk>;

  constructor() {
    this.client = new GraphQLClient(env.get('FUEL_PROVIDER'));
    this.sdk = getSdk(this.client);
  }
}
