/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';

import { parseAddressParam } from '../utils/address';
import { Domain } from '../utils/domain';

type Args = {
  address: string;
  id: string;
};

export class SearchDomain extends Domain<any, Args> {
  static createResolvers() {
    const domain = new SearchDomain();
    return {
      ...domain.createResolver('account', 'getAccount'),
      ...domain.createResolver('contractId', 'getContractId'),
      ...domain.createResolver('blockInfo', 'getBlockInfo'),
      ...domain.createResolver('transactionId', 'getTransactionId'),
    };
  }

  async getAccount() {
    const { address } = this.args;
    const parsedAddress = parseAddressParam(address);
    // TODO use last 5 once reverse pagination is supported
    const query = gql`
      query getTransactions($owner: Address!) {
        transactionsByOwner(owner: $owner, first: 5) {
          nodes {
            id
          }
        }
      }
    `;

    type Result = {
      transactionsByOwner: {
        nodes: {
          id: string;
        }[];
      };
    };
    const data = await this.query<Result>(query, { owner: parsedAddress });
    if (data.transactionsByOwner.nodes.length) {
      return {
        address: parsedAddress,
        transactions: data.transactionsByOwner.nodes.map((node) => {
          return { id: node.id };
        }),
      };
    }
    return null;
  }

  async getContractId() {
    const { id } = this.args;
    const contractId = parseAddressParam(id);
    const query = gql`
      query getContract($id: ContractId!) {
        contract(id: $id) {
          id
        }
      }
    `;

    type Result = {
      contract: {
        id: string;
      };
    };
    const data = await this.query<Result>(query, { id: contractId });
    if (data.contract) {
      return {
        id: data.contract.id,
      };
    }
    return null;
  }

  async getBlockInfo() {
    const { id } = this.args;
    const blockId = parseAddressParam(id);
    const query = gql`
      query getBlockInfo($id: BlockId!) {
        block(id: $id) {
          id
          header {
            height
          }
        }
      }
    `;
    type Result = {
      block: {
        id: string;
        header: {
          height: string;
        };
      };
    };
    const data = await this.query<Result>(query, { id: blockId });
    if (data.block) {
      return {
        id: data.block.id,
        height: data.block.header.height,
      };
    }
    return null;
  }

  async getTransactionId() {
    const { id } = this.args;
    const parsedId = parseAddressParam(id);
    const query = gql`
      query getTransaction($id: TransactionId!) {
        transaction(id: $id) {
          id
        }
      }
    `;

    type Result = {
      transaction: {
        id: string;
      };
    };
    const data = await this.query<Result>(query, { id: parsedId });
    if (data.transaction) {
      return {
        id: data.transaction.id,
      };
    }
    return null;
  }
}
