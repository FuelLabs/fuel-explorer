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

interface TransactionNode {
  __typename: 'TransactionFee';
  fee: string;
  timestamp: string;
}

// Common function to process transaction statistics
async function fetchTransactionStatistics(
  params: TransactionParams,
  fieldName:
    | 'transactionsFeeStatistics'
    | 'cumulativeTransactionsFeeStatistics',
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
  isCumulative = false,
) {
  const data = await (isCumulative
    ? sdk.cumulativeTransactionsFeeStatistics(params)
    : sdk.transactionsFeeStatistics(params));

  const { nodes, offset } = extractTransactionData(data, fieldName);

  if (!nodes.length) {
    return isCumulative
      ? { transactions: [], offset: 0 }
      : { transactions: [] };
  }

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
  const transactions = processTransactions(nodes, intervalMap);

  if (isCumulative) {
    return { transactions, offset };
  }

  return transactions;
}

// Helper to extract nodes and timestamps from the response
function extractTransactionData(
  data: any,
  fieldName: string,
): { nodes: TransactionNode[]; offset?: number } {
  const nodes = data.data[fieldName]?.nodes || [];
  const offset = data.data[fieldName]?.transactionOffset;
  return { nodes, offset };
}

async function getCumulativeTransactionFeeStats(
  params: TransactionParams,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
) {
  return fetchTransactionStatistics(
    params,
    'cumulativeTransactionsFeeStatistics',
    unit,
    intervalSize,
    true,
  );
}

export async function getTransactionFeeStats(
  params: TransactionParams,
  unit: 'minute' | 'hour' | 'day' | 'month',
  intervalSize: number,
) {
  return fetchTransactionStatistics(
    params,
    'transactionsFeeStatistics',
    unit,
    intervalSize,
  );
}

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

export const getCumulativeTransactionStats = act(
  schema,
  async ({ timeFilter }) => {
    const params = { timeFilter: timeFilter } as { timeFilter?: string };
    const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');

    return getCumulativeTransactionFeeStats(params, unit, intervalSize);
  },
);
