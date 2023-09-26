'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  last: z.number().default(12).optional(),
});

export const getLastTxs = act(schema, async ({ last = 12 }) => {
  const { data } = await sdk.getLastTransactions({ last }).catch(() => ({
    data: { transactions: { nodes: [] } },
  }));
  return data.transactions.nodes;
});
