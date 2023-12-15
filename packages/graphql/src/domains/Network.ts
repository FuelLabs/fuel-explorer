import { gql } from 'graphql-request';

import { getClient } from '../utils/client';

export class NetworkDomain {
  static async getChainInfo(providerUrl: string) {
    /** @todo: Get types from the query directly instead of creating custom types */
    type ChainInfoResult = {
      consensusParameters: {
        gasPriceFactor: string;
        gasPerByte: string;
      };
    };
    const gqlQuery = gql`
      query chainInfo {
        chain {
          consensusParameters {
            gasPriceFactor
            gasPerByte
          }
        }
      }
    `;

    const client = getClient(providerUrl);
    const data = await client.request<{ chain: ChainInfoResult }>(gqlQuery);
    return data.chain;
  }
}
