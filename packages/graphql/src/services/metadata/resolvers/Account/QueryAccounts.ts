/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GraphQLFieldResolver } from 'graphql';

import accountsData from '../../data/accounts.json';

export const QueryAccounts: GraphQLFieldResolver<
  any,
  any,
  {
    addresses: Array<string>;
  }
> = (_, { addresses }) => {
  return addresses
    .map((addres) =>
      accountsData.find(
        (account) => account.address.toLowerCase() === addres.toLowerCase(),
      ),
    )
    .filter((i) => !!i);
};
