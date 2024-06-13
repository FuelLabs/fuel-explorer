import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';
import { gql } from 'graphql-request';

import accountsData from '../data/accounts.json';
import { parseAddressParam } from '../utils/address';
import { Domain } from '../utils/domain';

type Args = {
  addresses: string[];
  address: string;
};

export class AccountDomain extends Domain<any, Args> {
  static delegateQuery(
    addresses: Array<string>,
    context: any,
    info: GraphQLResolveInfo,
  ) {
    return delegateToSchema({
      schema: info.schema,
      operation: OperationTypeNode.QUERY,
      fieldName: 'accounts',
      args: { addresses },
      context,
      info,
    });
  }

  static createResolvers() {
    const domain = new AccountDomain();
    return {
      ...domain.createResolver('accounts'),
      ...domain.createResolver('predicate', 'getPredicate'),
    };
  }

  get accounts() {
    const { addresses } = this.args;
    return addresses
      .map((addres) =>
        accountsData.find(
          (account) => account.address.toLowerCase() === addres.toLowerCase(),
        ),
      )
      .filter((i) => !!i);
  }

  async getPredicate() {
    const { address } = this.args;
    const owner = parseAddressParam(address);

    function findBytecodeInput(id: string, i: any) {
      return (i.owner === id || i.sender === id) && i.predicate !== '0x';
    }

    const query = gql`
      query predicate($address: Address!) {
        transactions: transactionsByOwner(first: 100, owner: $address) {
          nodes {
            id
            inputs {
              __typename
              ... on InputCoin {
                owner
                predicate
              }
              ... on InputMessage {
                sender
                predicate
              }
            }
          }
        }
      }
    `;

    type Result = {
      transactions: {
        nodes: {
          id: string;
          inputs: {
            __typename: string;
            owner: string;
            sender: string;
            predicate: string;
          }[];
        }[];
      };
    };

    const data = await this.query<Result>(query, { address: owner });
    const nodes = data.transactions.nodes;
    const inputs = nodes.flatMap((n) => n.inputs ?? []);
    const isPredicate = inputs.some((i) => findBytecodeInput(owner, i));
    if (!isPredicate) return null;

    const filtered = inputs.filter((i) => findBytecodeInput(owner, i));
    const first = filtered[0];
    return {
      id: first.owner || first.sender,
      bytecode: first.predicate,
    };
  }
}
