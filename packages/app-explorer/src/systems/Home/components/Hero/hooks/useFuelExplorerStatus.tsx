import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import { keepPreviousData } from '@tanstack/react-query';
import { useQuery } from 'wagmi/query';
import { getBlocksDashboard } from '../actions/get-blocks-dashboard';
import { getRollingStats } from '../actions/get-rolling-stats';
import { getStatistics } from '../actions/get-statistics';

/**
 * Recent blocks for the DataTable tile.
 */
export const useDashboardBlocks = () => {
  return useQuery({
    queryKey: ['home', 'blocks'],
    queryFn: async () => {
      const blocksData = await getBlocksDashboard();
      const blocks: GQLBlocksDashboard[] =
        blocksData?.getBlocksDashboard.nodes.map(
          (node: any) =>
            ({
              blockNo: node.blockNo ?? '',
              producer: node.producer ?? '',
              blockHash: node.blockHash ?? '',
              timestamp: node.timestamp,
              gasUsed: node.gasUsed,
              gasUsedInUsd: node.gasUsedInUsd,
              totalFee: node.totalFee,
              totalFeeInUsd: node.totalFeeInUsd,
              transactionsCount: node.transactionsCount,
              blockSize: node.blockSize,
              tps: node.tps,
            }) as any,
        ) || [];

      return { blocks } as any;
    },
    placeholderData: keepPreviousData,
    refetchInterval: 5_000,
  });
};

/**
 * 60s rolling stats for the RollingStats tile.
 */
export const useRollingStats = () => {
  return useQuery({
    queryKey: ['home', 'rolling'],
    queryFn: async () => {
      const data = await getRollingStats();
      const rollingStats60s = data?.rollingStats60s ?? {
        tps: 0,
        avgTxPerBlock: 0,
        avgGasPerBlock: 0,
        avgBlockSize: 0,
        peakTps: 0,
      };

      return { rollingStats60s } as any;
    },
    placeholderData: keepPreviousData,
    refetchInterval: 10_000,
  });
};

/**
 * TPS, average TPS per minute and fee series for the chart tiles
 * (DailyTransaction, TPSHourly, GasSpentChart).
 */
export const useHomeCharts = () => {
  return useQuery({
    queryKey: ['home', 'charts'],
    queryFn: async () => {
      const statistics = await getStatistics();
      const tps = statistics?.totalTps?.map((t: any) => ({
        time: t.date ?? '',
        value: t.value,
      }));
      const averageTpsPerMinute = statistics?.averageTpsPerMinute?.map(
        (t: any) => ({
          time: t.date ?? '',
          value: Number(t.value) || 0,
        }),
      );
      const fee = {
        total: statistics?.totalFee24hrs,
        data: statistics?.totalFee,
      } as any;

      return { tps, averageTpsPerMinute, fee } as any;
    },
    placeholderData: keepPreviousData,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
};
