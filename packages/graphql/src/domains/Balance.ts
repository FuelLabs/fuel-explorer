/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GraphQLResolveInfo } from 'graphql';
import { gql } from 'graphql-request';

import type { Balance } from '../generated/types';
import { getClient } from '../utils/client';

export class BalanceDomain {
  constructor(
    private connection: Balance,
    private context: any,
    private info: GraphQLResolveInfo,
  ) {}

  static createResolver(key: string, func?: string) {
    return {
      [key]: {
        resolve(
          connection: Balance,
          _args: any,
          context: any,
          info: GraphQLResolveInfo,
        ) {
          const domain = new BalanceDomain(connection, context, info);
          return func ? domain[func]() : domain[key] ?? null;
        },
      },
    };
  }

  static createResolvers() {
    return {
      ...BalanceDomain.createResolver('utxos', 'getUtxos'),
    };
  }

  async getUtxos() {
    const { connection } = this;
    const query = gql`
      query getUtxos($assetId: AssetId!, $owner: Address!) {
        coins(first: 1000, filter: { assetId: $assetId, owner: $owner }) {
          nodes {
            amount
            utxoId
            txCreatedIdx
            blockCreated
          }
        }
      }
    `;

    type UtxosResponse = {
      coins: {
        nodes: {
          amount: string;
          utxoId: string;
          txCreatedIdx: number;
          blockCreated: number;
        }[];
      };
    };

    const client = getClient(this.context.url);
    const res = await client.request<UtxosResponse>(query, connection);
    const data = res.coins.nodes;
    return data;
  }
}
