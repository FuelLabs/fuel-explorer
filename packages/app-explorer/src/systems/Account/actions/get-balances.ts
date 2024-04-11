'use server';

import type { GQLBalancesQuery } from '@fuel-explorer/graphql-new';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
});

export const getBalances = act(schema, async (input) => {
  const owner = parseAddressParam(input.owner);
  const { data } = await sdk.balances({ filter: { owner } }).catch((_) => {
    const data: GQLBalancesQuery = {
      __typename: 'Query',
      balances: {
        __typename: 'BalanceConnection',
        nodes: [],
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: null,
          startCursor: null,
        },
      },
    };

    return {
      data,
    };
  });

  return data.balances.nodes;
});
