'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  owner: z.string().nullable(),
});

export const getBalances = act(schema, async (input) => {
  if (!input.owner) return null;
  const { data } = await sdk.getBalances(input).catch((_) => {
    return { data: { balances: { nodes: [] } } };
  });
  return data.balances.nodes;
});
