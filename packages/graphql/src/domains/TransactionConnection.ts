/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GraphQLResolveInfo } from 'graphql';

import type { TransactionConnection } from '../generated/types';
import { removeDuplicates, getFieldsValues } from '../utils';

import { AccountDomain } from './Account';
import { TokenDomain } from './Token';

export class TransactionConnectionDomain {
  constructor(
    private connection: TransactionConnection,
    private context: any,
    private info: GraphQLResolveInfo,
  ) {}

  static createResolver(key: string) {
    return {
      [key]: {
        resolve(
          connection: TransactionConnection,
          _args: any,
          context: any,
          info: GraphQLResolveInfo,
        ) {
          const domain = new TransactionConnectionDomain(
            connection,
            context,
            info,
          );
          return domain[key] ?? null;
        },
      },
    };
  }

  static createResolvers() {
    return {
      ...TransactionConnectionDomain.createResolver('tokens'),
      ...TransactionConnectionDomain.createResolver('accounts'),
    };
  }

  get tokens() {
    const { connection, context, info } = this;
    const assetsId = removeDuplicates(
      getFieldsValues(connection.nodes, ['assetId']),
    );
    const domain = new TokenDomain();
    return domain.delegateQuery(assetsId, context, info);
  }

  get accounts() {
    const { connection, context, info } = this;
    const assetsId = removeDuplicates(
      getFieldsValues(connection.nodes, [
        'to',
        'owner',
        'recipient',
        'sender',
        'toAddress',
      ]),
    );
    const domain = new AccountDomain();
    return domain.delegateQuery(assetsId, context, info);
  }
}
