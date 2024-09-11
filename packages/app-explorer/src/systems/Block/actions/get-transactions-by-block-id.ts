'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { isValidAddress } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
  cursor: z.string().optional().nullable(),
  dir: z.enum(['after', 'before']).optional(),
});

export const getTransactionsByBlockId = act(schema, async (input) => {
  const id = input.id;
  const { cursor, dir = 'after' } = input;
  const params = { last: 10 } as {
    first?: number;
    last?: number;
    before?: string;
    after?: string;
  };
  if (cursor && dir === 'after') {
    params.after = cursor;
  }
  if (cursor && dir === 'before') {
    params.before = cursor;
  }
  const isValidBlockHeight = !Number.isNaN(Number(id));
  if (!id || (!isValidBlockHeight && !isValidAddress(id))) {
    throw new Error('Invalid block number or block id');
  }
  const { data } = await sdk.transactionsByBlockId({ blockId: id, ...params });
  return data;
});
