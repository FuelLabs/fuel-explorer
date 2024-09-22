'use server';

import { z } from 'zod';
import { act } from '../../systems/Core/utils/act-server';
import { sdk } from '../../systems/Core/utils/sdk';
import { DateHelper } from '../utils/date';
import { createIntervals, getUnitAndInterval } from '../utils/utils';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

export const getBlockStats = act(schema, async ({ timeFilter }) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  const data = await sdk.blockRewardStatistics(params);

  if (!data.data.blockRewardStatistics.nodes) {
    return {};
  }
  const { unit, intervalSize } = getUnitAndInterval(params.timeFilter || '');
  const nodes = data.data.blockRewardStatistics.nodes;
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
    totalRewards: 0,
  }));

  // Process blocks and put them into the correct interval
  nodes.forEach((block) => {
    const blockTimestamp = Number(DateHelper.tai64toDate(block.timestamp));
    const blockReward = Number(block.reward);

    // Find the correct interval for the current block
    for (const interval of intervalMap) {
      const intervalStart = new Date(interval.start).getTime();
      const intervalEnd = new Date(interval.end).getTime();

      if (blockTimestamp >= intervalStart && blockTimestamp < intervalEnd) {
        // Increment count and add the reward to totalRewards
        interval.count += 1;
        interval.totalRewards += blockReward;
        break; // Block has been assigned to the correct interval, no need to check further
      }
    }
  });
  return intervalMap;
});
