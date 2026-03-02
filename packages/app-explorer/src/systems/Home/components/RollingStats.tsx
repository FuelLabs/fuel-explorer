import { HStack, RoundedContainer, VStack } from '@fuels/ui';

interface RollingStatsProps {
  tps: number;
  avgTxPerBlock: number;
  avgBlockSize: number;
  blockNo?: string;
  blockHash?: string;
  totalFeeInUsd?: string;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} KB`;
  return `${Math.round(bytes)} B`;
}

export const RollingStats = ({
  tps,
  avgTxPerBlock,
  avgBlockSize,
  blockNo,
  blockHash,
  totalFeeInUsd,
}: RollingStatsProps) => {
  return (
    <RoundedContainer className="py-4 px-5 h-full bg-light-gradient dark:bg-dark-gradient">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="text-[15px] leading-[24px] text-heading font-semibold">
            Latest Block
          </div>
        </div>
        {blockNo && (
          <h2 className="text-[27px] lg:text-[32px] leading-[36px] text-heading font-bold">
            {blockNo}
          </h2>
        )}
      </div>

      {(blockHash || totalFeeInUsd) && (
        <HStack className="flex items-start justify-between w-full mt-6">
          <VStack>
            <p> </p>
            {blockHash && (
              <p className="block w-full max-w-[144px] truncate line-clamp-1 text-[13px] leading-[20px] text-muted">
                {blockHash}
              </p>
            )}
          </VStack>
          <VStack gap={'0'} className="items-end">
            <p className="line-clamp-1 text-[13px] leading-[20px]">
              Block Reward
            </p>
            <p className="line-clamp-1 text-[13px] leading-[20px] text-muted">
              {totalFeeInUsd || '$0'}
            </p>
          </VStack>
        </HStack>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] leading-[18px] text-muted font-medium uppercase tracking-wide">
            Network (60s avg)
          </span>
        </div>
        <div className="space-y-3">
          <div className="h-[1px] bg-gray-4 dark:bg-gray-3" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-muted">TPS</span>
            <span className="text-[15px] text-heading font-semibold">
              {tps.toFixed(2)}
            </span>
          </div>
          <div className="h-[1px] bg-gray-4 dark:bg-gray-3" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-muted">TX / Block</span>
            <span className="text-[15px] text-heading font-semibold">
              {avgTxPerBlock.toFixed(1)}
            </span>
          </div>
          <div className="h-[1px] bg-gray-4 dark:bg-gray-3" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-muted">Block Size</span>
            <span className="text-[15px] text-heading font-semibold">
              {formatBytes(avgBlockSize)}
            </span>
          </div>
        </div>
      </div>
    </RoundedContainer>
  );
};

export default RollingStats;
