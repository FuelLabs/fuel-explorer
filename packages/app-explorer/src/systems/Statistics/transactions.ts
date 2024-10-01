'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

export const getTransactionStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  const data = await sdk.transactionsStatistics(params);
  return data;
});

export const getTransactionFeeStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  const data = await sdk.transactionFeeStatistics(params);
  return data;
});

export const getCumulativeTransactionFeeStats = act(
  schema,
  async ({ timeFilter }) => {
    const params = { timeFilter: timeFilter } as {
      timeFilter?: string;
    };
    const data = await sdk.cumulativeFeeStatistics(params);
    return data;
  },
);

export const getCumulativeTransactionStats = act(
  schema,
  async ({ timeFilter }) => {
    const params = { timeFilter: timeFilter } as {
      timeFilter?: string;
    };
    const data = await sdk.cumulativeTransactionStatistics(params);
    return data;
  },
);
