/* eslint-disable @typescript-eslint/no-explicit-any */
import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';

import accountsData from '../data/accounts.json';
import { metadataSchema } from '../services/metadata';

export class AccountDomain {
  constructor() {}

  delegateQuery(
    addresses: Array<string>,
    context: any,
    info: GraphQLResolveInfo,
  ) {
    return delegateToSchema({
      schema: metadataSchema,
      operation: OperationTypeNode.QUERY,
      fieldName: 'accounts',
      args: { addresses },
      context,
      info,
    });
  }

  static queryAccounts(addresses: Array<string>) {
    return addresses
      .map((addres) =>
        accountsData.find(
          (account) => account.address.toLowerCase() === addres.toLowerCase(),
        ),
      )
      .filter((i) => !!i);
  }
}

export function createAccountsResolver(
  _source: any,
  _args: any,
  { addresses }: { addresses: string[] },
) {
  return AccountDomain.queryAccounts(addresses);
}
