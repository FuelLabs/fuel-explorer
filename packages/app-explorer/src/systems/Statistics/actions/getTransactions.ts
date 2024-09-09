'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';
import { DateHelper } from '../utils/date';
import { createIntervals, getUnitAndInterval } from '../utils/utils';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

export const getTransactionStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  console.log(params);
  const data = await sdk.transactionsFeeStatistics(params);
  console.log(data);

  if (!data.data.transactionsFeeStatistics.nodes) {
    return {};
  }
  const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');
  console.log(unit, intervalSize);
  const nodes = data.data.transactionsFeeStatistics.nodes;
  const firstTimestamp = Number(DateHelper.tai64toDate(nodes[0].timestamp));
  const lastTimestamp = Number(
    DateHelper.tai64toDate(nodes[nodes.length - 1].timestamp),
  );

  const intervals = createIntervals(
    firstTimestamp,
    lastTimestamp,
    unit,
    intervalSize,
  );

  const intervalMap = intervals.map((interval) => ({
    start: interval.start.toISOString(),
    end: interval.end.toISOString(),
    count: 0,
    totalFee: 0,
  }));

  // Process transactions and put them into the correct interval
  nodes.forEach((transaction) => {
    const transactionTimestamp = Number(
      DateHelper.tai64toDate(transaction.timestamp),
    );
    const transactionFee = Number(transaction.fee);

    // Find the correct interval for the current transaction
    for (const interval of intervalMap) {
      const intervalStart = new Date(interval.start).getTime();
      const intervalEnd = new Date(interval.end).getTime();

      if (
        transactionTimestamp >= intervalStart &&
        transactionTimestamp < intervalEnd
      ) {
        // Increment count and add the transaction fee to totalFee
        interval.count += 1;
        interval.totalFee += transactionFee;
        break; // transaction has been assigned to the correct interval, no need to check further
      }
    }
  });
  return intervalMap;
});
