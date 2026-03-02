import { RoundedContainer } from '@fuels/ui';

interface RollingStatsProps {
  tps: number;
  avgTxPerBlock: number;
  avgBlockSize: number;
  blockNo?: string;
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
  totalFeeInUsd,
}: RollingStatsProps) => {
  return (
    <RoundedContainer className="py-3 px-5 flex flex-col bg-light-gradient dark:bg-dark-gradient">
      <div className="flex items-center">
        <span className="text-[15px] leading-[24px] text-heading font-semibold">
          Live Stats
        </span>
        <span className="text-[13px] leading-[20px] text-muted ml-1.5">
          (60s)
        </span>
      </div>

      <div className="flex justify-between mt-3">
        <div>
          <span className="text-[17px] leading-[24px] text-heading font-bold block">
            {tps.toFixed(2)}
          </span>
          <span className="text-[11px] leading-[16px] text-muted">TPS</span>
        </div>
        <div>
          <span className="text-[17px] leading-[24px] text-heading font-bold block">
            {avgTxPerBlock.toFixed(1)}
          </span>
          <span className="text-[11px] leading-[16px] text-muted">
            TX / Block
          </span>
        </div>
        <div>
          <span className="text-[17px] leading-[24px] text-heading font-bold block">
            {formatBytes(avgBlockSize)}
          </span>
          <span className="text-[11px] leading-[16px] text-muted">
            Block Size
          </span>
        </div>
      </div>

      {blockNo && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-4 dark:border-gray-3">
          <span className="text-[12px] leading-[18px] text-muted">
            Block <span className="text-heading font-semibold">{blockNo}</span>
          </span>
          {totalFeeInUsd && (
            <span className="text-[12px] leading-[18px] text-muted">
              Reward{' '}
              <span className="text-heading font-semibold">
                {totalFeeInUsd}
              </span>
            </span>
          )}
        </div>
      )}
    </RoundedContainer>
  );
};

export default RollingStats;
