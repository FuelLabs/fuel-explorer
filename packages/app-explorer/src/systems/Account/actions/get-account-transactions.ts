'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
  cursor: z.string().optional().nullable(),
  dir: z.enum(['after', 'before']).optional(),
});

const PER_PAGE = 10;

export const getAccountTransactions = act(schema, async (input) => {
  const { cursor, dir = 'after' } = input;
  const params = { last: PER_PAGE } as {
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
  const owner = parseAddressParam(input.owner);
  const { data } = await sdk.transactionsByOwner({ owner, ...params });
  return data.transactionsByOwner;
});
