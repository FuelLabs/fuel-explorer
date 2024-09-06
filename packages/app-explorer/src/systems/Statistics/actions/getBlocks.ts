'use server';

import { z } from 'zod';
import { act } from '~/systems/Core/utils/act-server';
import { sdk } from '~/systems/Core/utils/sdk';
import { DateHelper } from '../utils/Date';
import { createIntervals, getUnitAndInterval } from '../utils/utils';

const schema = z.object({
  timeFilter: z.string().optional().nullable(),
});

export const getBlocks = act(schema, async (timeFilter) => {
  const params = { timeFilter: timeFilter } as {
    timeFilter?: string;
  };
  const data = await sdk.blockRewardStatistics(params);
  const _blocks = data.data.blockRewardStatistics.nodes;
  return data.data.blockRewardStatistics;
});

const _getBlocksStats = async (timeFilter: string) => {
  const { unit, intervalSize } = getUnitAndInterval(timeFilter);
  console.log('unit', unit);
  console.log('intervalSize', intervalSize);
  const { data } = await sdk.blockRewardStatistics({ timeFilter: '7days' });

  // console.log(data.blockRewardStatistics.nodes);
  if (data.blockRewardStatistics.nodes) {
    const nodes = data.blockRewardStatistics.nodes;
    const firstTimestamp = Number(DateHelper.tai64toDate(nodes[0].timestamp));
    const lastTimestamp = Number(
      DateHelper.tai64toDate(nodes[nodes.length - 1].timestamp),
    );

    console.log('firstTimestamp ', firstTimestamp);
    console.log('lastTimestamp ', lastTimestamp);

    const intervals = createIntervals(
      firstTimestamp,
      lastTimestamp,
      unit,
      intervalSize,
    );
    console.log(intervals);

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
    console.log(intervalMap);
  }
};
