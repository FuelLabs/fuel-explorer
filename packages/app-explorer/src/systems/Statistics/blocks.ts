'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

export const getNewBlocksStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  const data = await sdk.newBlockStatistics(params);
  return data;
});

export const getBlockRewardStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  const data = await sdk.blockRewardStatistics(params);
  return data;
});
