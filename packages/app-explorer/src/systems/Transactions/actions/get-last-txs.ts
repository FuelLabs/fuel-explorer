'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const PER_PAGE = 10;

const schema = z
  .object({
    after: z.string().optional(),
    before: z.string().optional(),
  })
  .refine(({ after, before }) => {
    if (after && before) {
      throw new Error(
        "Both 'after' and 'before' parameters cannot exist together.",
      );
    }

    return true;
  });

export const getLastTxs = act(schema, async ({ after, before }) => {
  const cursor = after ? 'first' : 'last';

  const { data } = await sdk.transactions({
    [cursor]: PER_PAGE,
    after,
    before,
  });

  return {
    transactions: data.transactions.nodes.reverse(),
    pageInfo: data.transactions.pageInfo,
  };
});
