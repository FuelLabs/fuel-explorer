'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
});

export const getBalances = act(schema, async (input) => {
  const owner = parseAddressParam(input.owner);
  const { data } = await sdk.getBalances({ owner }).catch((_) => {
    return { data: { balances: { nodes: [] } } };
  });
  return data.balances.nodes;
});
