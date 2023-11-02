'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getBlock = act(schema, async (input) => {
  if (isNaN(Number(input.id))) {
    throw new Error('Invalid block number');
  }
  const id = input.id;
  const { data } = await sdk.getBlock({ height: id }).catch((_) => {
    return { data: { block: null } };
  });

  return data.block;
});
