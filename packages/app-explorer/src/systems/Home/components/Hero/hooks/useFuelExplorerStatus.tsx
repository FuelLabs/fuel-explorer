import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import { keepPreviousData } from '@tanstack/react-query';
import { useQuery } from 'wagmi/query';
import { getBlocksDashboard } from '../actions/get-blocks-dashboard';
import { getStatistics } from '../actions/get-statistics';

export const useFuelExplorerStatus = () => {
  return useQuery({
    queryKey: ['FuelExplorerStatus'],
    queryFn: async () => {
      const [statistics, blocksData] = await Promise.all([
        getStatistics(),
        getBlocksDashboard(),
      ]);
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
      const rollingStats60s = statistics?.rollingStats60s ?? {
        tps: 0,
        avgTxPerBlock: 0,
        avgGasPerBlock: 0,
        avgBlockSize: 0,
        peakTps: 0,
      };
      const fee = {
        total: statistics?.totalFee24hrs,
        data: statistics?.totalFee,
      } as any;
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

      return {
        blocksData,
        tps,
        averageTpsPerMinute,
        rollingStats60s,
        fee,
        blocks,
      } as any;
    },
    placeholderData: keepPreviousData,
    refetchInterval: 10_000,
  });
};
