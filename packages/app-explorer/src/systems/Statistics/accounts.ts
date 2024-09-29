'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';

// Schema for timeFilter validation
const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

// Utility function to provide a default value for timeFilter
const ensureTimeFilter = (timeFilter?: string | null): string => {
  return timeFilter ?? 'default'; // 'default' can be replaced with an appropriate default value
};

// Function to get New Account Statistics
export const getNewAccountStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: ensureTimeFilter(timeFilter) };
  const data = await sdk.newAccountStatistics(params);
  return data;
});

// Function to get Daily Active Account Statistics
export const getDailyActiveAccountStats = act(
  schema,
  async ({ timeFilter }) => {
    const params = { timeFilter: ensureTimeFilter(timeFilter) };
    const data = await sdk.dailyActiveAccountStatistics(params);
    return data;
  },
);

// Function to get Cumulative Account Statistics
export const getCumulativeAccountStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: ensureTimeFilter(timeFilter) };
  const data = await sdk.cumulativeAccountStatistics(params);
  return data;
});
