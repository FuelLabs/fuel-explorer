'use server';

import { notFound } from 'next/navigation';
import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getTx = act(schema, async (input) => {
  try {
    const id = parseAddressParam(input.id);
    const { data } = await sdk.transactionDetails({ id });
    return data.transaction;
  } catch (e) {
    console.error(e);
    return notFound();
  }
});
