'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getTx = act(schema, async (input) => {
  const id = parseAddressParam(input.id);
  const { data } = await sdk.getTransaction({ id }).catch((_) => {
    return { data: { transaction: null } };
  });
  return data.transaction;
});
