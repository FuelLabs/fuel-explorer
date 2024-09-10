'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';
import { DateHelper } from '../utils/date';
import {
  createIntervals,
  getUnitAndInterval,
  processTransactions,
} from '../utils/utils';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

interface TransactionParams {
  timeFilter?: string;
}

async function getTransactionFeeStats(
  params: TransactionParams,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
) {
  const data = await sdk.transactionsFeeStatistics(params);

  if (!data.data.transactionsFeeStatistics.nodes) {
    return {};
  }

  const nodes = data.data.transactionsFeeStatistics.nodes;
  const firstTimestamp = Number(DateHelper.tai64toDate(nodes[0].timestamp));
  const lastTimestamp = Number(
    DateHelper.tai64toDate(nodes[nodes.length - 1].timestamp),
  );

  const intervalMap = createIntervals(
    firstTimestamp,
    lastTimestamp,
    unit,
    intervalSize,
  );
  return processTransactions(nodes, intervalMap);
}

// Exported functions using the common helper
export const getTransactionStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as { timeFilter?: string };
  const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');

  return getTransactionFeeStats(params, unit, intervalSize);
});

export const getDailyTransactionFeeStats = act(
  schema,
  async ({ timeFilter }) => {
    const params = { timeFilter: timeFilter } as { timeFilter?: string };

    // Use 'day' as the unit and 1 as the interval size
    return getTransactionFeeStats(params, 'day', 1);
  },
);
