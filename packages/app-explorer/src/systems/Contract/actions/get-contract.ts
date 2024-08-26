'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

export const getContract = act(schema, async (input) => {
  const id = parseAddressParam(input.id);
  const { data } = await sdk.contract({ id });
  return data.contract;
});

export const getContractBalances = act(schema, async (input) => {
  const contract = parseAddressParam(input.id);
  const { data } = await sdk.contractBalances({ filter: { contract } });
  return data.contractBalances;
});
