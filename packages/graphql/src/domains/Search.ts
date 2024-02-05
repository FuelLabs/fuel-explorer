/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';

import { parseAddressParam } from '../utils/address';
import { Domain } from '../utils/domain';

type Args = {
  query: string;
};

export type SearchResult = {
  account: null | {
    address: string;
    transactions: { id: string }[];
  };
  contract: null | {
    id: string;
  };
  block: null | {
    id: string;
    height: string;
  };
  transaction: null | {
    id: string;
  };
};

export class SearchDomain extends Domain<any, Args> {
  static createResolvers() {
    const domain = new SearchDomain();
    return {
      ...domain.createResolver('search', 'getSearch'),
    };
  }

  async getSearch() {
    const { query } = this.args;
    const parsedQuery = parseAddressParam(query);
    // TODO use last 5 once reverse pagination is supported
    const gqlQuery = gql`
      query fuelCoreQuery(
        $owner: Address!
        $contractId: ContractId!
        $blockId: BlockId!
        $transactionId: TransactionId!
      ) {
        transactionsByOwner(owner: $owner, first: 5) {
          nodes {
            id
          }
        }
        contract(id: $contractId) {
          id
        }
        block(id: $blockId) {
          id
          header {
            height
          }
        }
        transaction(id: $transactionId) {
          id
        }
      }
    `;

    /** @todo: Get types from the query directly instead of creating custom types */
    type Result = {
      transactionsByOwner: {
        nodes: {
          id: string;
        }[];
      };
      contract: {
        id: string;
      };
      block: {
        id: string;
        header: {
          height: string;
        };
      };
      transaction: {
        id: string;
      };
    };

    const data = await this.query<Result>(gqlQuery, {
      owner: parsedQuery,
      contractId: parsedQuery,
      blockId: parsedQuery,
      transactionId: parsedQuery,
    });
    const result: SearchResult = {
      account: null,
      contract: null,
      block: null,
      transaction: null,
    };

    if (data.transactionsByOwner.nodes.length) {
      result.account = {
        address: parsedQuery,
        transactions: data.transactionsByOwner.nodes.map((node) => {
          return { id: node.id };
        }),
      };
    }

    if (data.contract) {
      result.contract = { id: data.contract.id };
    }

    if (data.block) {
      result.block = { id: data.block.id, height: data.block.header.height };
    }

    if (data.transaction) {
      result.transaction = { id: data.transaction.id };
    }
    return result;
  }
}
