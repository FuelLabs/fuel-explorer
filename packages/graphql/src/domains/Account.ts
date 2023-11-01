/* eslint-disable @typescript-eslint/no-explicit-any */
import { delegateToSchema } from '@graphql-tools/delegate';
import type { GraphQLResolveInfo } from 'graphql';
import { OperationTypeNode } from 'graphql';

import accountsData from '../data/accounts.json';
import { Domain } from '../utils/domain';

type Args = {
  addresses: string[];
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
}
