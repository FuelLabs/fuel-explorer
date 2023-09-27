'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getTx = act(schema, async (input) => {
  if (!input.id) return null;
  const { data } = await sdk.getTransaction(input);
  return data.transaction;
});
