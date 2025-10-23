'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { parseAddressParam } from '~/systems/Core/utils/address';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  id: z.string().nullable(),
});

const schemaMintedAssets = z.object({
  id: z.string().nullable(),
  cursor: z.string().optional().nullable(),
  dir: z.enum(['after', 'before']).optional(),
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

export const getContractMintedAssets = act(
  schemaMintedAssets,
  async (input) => {
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
    const contractId = parseAddressParam(input.id);
    const { data } = await sdk.assetsByContract({ contractId, ...params });
    return data.assetsByContract;
  },
);
