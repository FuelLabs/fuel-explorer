import { z } from 'zod';
import { act } from '../../../../../systems/Core/utils/act-server';
import { sdk } from '../../../../../systems/Core/utils/sdk';
('~../src/systems/Core/utils/sdk');

const schema = z.object({
  before: z.string().optional().nullable(),
});

export const getTPS = act(schema, async ({ before }) => {
  const params = { last: 86400 } as {
    last?: number;
    before?: string;
  };
  if (before) {
    params.before = before;
  }

  const { data } = await sdk.tps(params);
  return data;
});
