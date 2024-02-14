import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/types';
import { requireEnv } from '../utils/require-env';

const env = requireEnv([['FUEL_PROVIDER', 'http://127.0.0.1:4000/graphql']]);

export type GQLClient = ReturnType<typeof getSdk>;

export class GraphQLSDK {
  client: GraphQLClient;
  sdk: ReturnType<typeof getSdk>;

  constructor() {
    this.client = new GraphQLClient(env.FUEL_PROVIDER);
    this.sdk = getSdk(this.client);
  }
}