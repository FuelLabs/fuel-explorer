'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';
import {
  createIntervals,
  getUnitAndInterval,
  processAccounts, // You would need to implement this to handle account-specific data
} from '../utils/utils';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

interface AccountParams {
  timeFilter?: string;
}

interface AccountNode {
  __typename: 'Account';
  timestamp: string;
}

// Common function to process account statistics
async function fetchAccountStatistics(
  params: AccountParams,
  fieldName:
    | 'newAccountStatistics'
    | 'cumulativeAccountCreationStatistics'
    | 'dailyActiveAccounts',
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
  isCumulative = false,
) {
  const data = await (fieldName === 'dailyActiveAccounts'
    ? sdk.dailyActiveAccounts(params)
    : isCumulative
      ? sdk.cumulativeAccountCreationStatistics(params)
      : sdk.newAccountStatistics(params));

  const { nodes, offset } = extractAccountData(data, fieldName);
  if (!nodes.length) {
    return isCumulative ? { accounts: [], offset: 0 } : { accounts: [] };
  }

  const firstTimestamp = Number(nodes[0].timestamp);
  const lastTimestamp = Number(nodes[nodes.length - 1].timestamp);

  const intervalMap = createIntervals(
    firstTimestamp,
    lastTimestamp,
    unit,
    intervalSize,
  );
  const accounts = processAccounts(nodes, intervalMap);

  if (isCumulative) {
    return { accounts, offset };
  }

  return accounts;
}

// Helper to extract nodes and timestamps from the response
function extractAccountData(
  data: any,
  fieldName: string,
): { nodes: AccountNode[]; offset?: number } {
  const nodes = data.data[fieldName]?.nodes || [];
  const offset = data.data[fieldName]?.accountOffset;
  return { nodes, offset };
}

async function getDailyActiveAccountStats(
  params: AccountParams,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
) {
  return fetchAccountStatistics(
    params,
    'dailyActiveAccounts', // Specify the new field for daily active accounts
    unit,
    intervalSize,
  );
}

async function getCumulativeAccountCreationStats(
  params: AccountParams,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
) {
  return fetchAccountStatistics(
    params,
    'cumulativeAccountCreationStatistics',
    unit,
    intervalSize,
    true,
  );
}

async function getNewAccountCreationStats(
  params: AccountParams,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
) {
  return fetchAccountStatistics(
    params,
    'newAccountStatistics',
    unit,
    intervalSize,
  );
}

export const getDailyActiveAccountStatsAction = act(
  schema,
  async ({ timeFilter }) => {
    const params = { timeFilter: timeFilter } as { timeFilter?: string };
    const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');

    return getDailyActiveAccountStats(params, unit, intervalSize);
  },
);

export const getNewAccountStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as { timeFilter?: string };
  const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');

  return getNewAccountCreationStats(params, unit, intervalSize);
});

export const getCumulativeAccountStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as { timeFilter?: string };
  const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');

  return getCumulativeAccountCreationStats(params, unit, intervalSize);
});
