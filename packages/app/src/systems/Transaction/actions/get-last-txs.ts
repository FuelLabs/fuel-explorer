'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  first: z.number().optional().nullable(),
  last: z.number().optional().nullable(),
});

export const getLastTxs = act(schema, async (input) => {
  const { data } = await sdk.getLastTransactions(input).catch((_) => {
    return { data: { transactions: { edges: [] } } };
  });
  return data.transactions;
});
