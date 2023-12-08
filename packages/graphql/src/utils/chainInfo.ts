import { gql } from 'graphql-request';

import { getClient } from './client';

/** @todo: Get types from the query directly instead of creating custom types */
export type ChainInfoResult = {
  consensusParameters: {
    feeParams: {
      gasPriceFactor: string;
      gasPerByte: string;
    };
  };
};

export async function getChainInfo(url: string) {
  const gqlQuery = gql`
    query chainInfo {
      chain {
        consensusParameters {
          feeParams {
            gasPriceFactor
            gasPerByte
          }
        }
      }
    }
  `;

  const client = getClient(url);
  const data = await client.request<{ chain: ChainInfoResult }>(gqlQuery);
  return data.chain;
}
