'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';

const schema = z.object({
  query: z.string(),
});

export const search = act(schema, async ({ query }) => {
  const { data } = await sdk.search({ query });
  return data?.search ?? null;
});
