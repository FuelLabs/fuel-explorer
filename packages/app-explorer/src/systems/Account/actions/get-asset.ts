'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  assetId: z.string(),
});

export const getAsset = act(schema, async (input) => {
  const { data } = await sdk.asset({ assetId: input.assetId });
  return data.asset;
});
