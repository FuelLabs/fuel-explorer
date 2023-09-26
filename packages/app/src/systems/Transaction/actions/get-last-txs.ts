'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { explorer } from '~/systems/explerer';

const schema = z.object({
  last: z.number().default(12).optional(),
});

export const getLastTxs = act(schema, async ({ last = 12 }) => {
  const { data } = await explorer.getLastTransactions({ last }).catch(() => ({
    data: { transactions: { nodes: [] } },
  }));
  return data.transactions.nodes;
});
