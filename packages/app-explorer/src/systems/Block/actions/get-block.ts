'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { isValidAddress } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getBlock = act(schema, async (input) => {
  const id = input.id;
  const isAddressValid = isValidAddress(id);
  const isValidBlockHeight = !Number.isNaN(Number(id));
  if (!isValidBlockHeight && !isValidAddress) {
    throw new Error('Invalid block number or block id');
  }

  const params = isAddressValid ? { id } : { height: id };
  const { data } = await sdk.block(params);
  return { block: data.block, producer: data.block?.producer };
});
