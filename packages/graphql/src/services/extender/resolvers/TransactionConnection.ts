import type { IResolvers } from '@graphql-tools/utils';

import { getFieldsValues, removeDuplicates } from '../../../utils';
import { delegateQueryAccounts } from '../delegators/QueryAccounts';
import { delegateQueryTokens } from '../delegators/QueryTokens';

export const TransactionConnection: IResolvers = {
  tokens: {
    resolve(transactionConnection, args, context, info) {
      const assetsId = removeDuplicates(
        getFieldsValues(transactionConnection.nodes, ['assetId']),
      );
      return delegateQueryTokens(assetsId, context, info);
    },
  },
  accounts: {
    resolve(transactionConnection, args, context, info) {
      const assetsId = removeDuplicates(
        getFieldsValues(transactionConnection.nodes, [
          'to',
          'owner',
          'recipient',
          'sender',
          'toAddress',
        ]),
      );
      return delegateQueryAccounts(assetsId, context, info);
    },
  },
};
