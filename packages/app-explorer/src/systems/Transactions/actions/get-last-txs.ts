'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const PER_PAGE = 10;

const schema = z.object({
  cursor: z.string().optional().nullable(),
  dir: z.enum(['next', 'prev']).optional(),
});

export const getLastTxs = act(schema, async ({ cursor, dir = 'next' }) => {
  const params = { first: PER_PAGE } as {
    first: number;
    before?: string;
    after?: string;
  };
  if (cursor && dir === 'next') {
    params.after = cursor;
  }
  if (cursor && dir === 'prev') {
    params.before = cursor;
  }
  console.log(params);
  const { data } = await sdk.recentTransactions(params);
  return data.transactions.nodes;
});
