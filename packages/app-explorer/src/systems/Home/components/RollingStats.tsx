import { RoundedContainer } from '@fuels/ui';
import { formatBytes } from './format';

interface RollingStatsProps {
  tps: number;
  avgTxPerBlock: number;
  avgBlockSize: number;
}

export const RollingStats = ({
  tps,
  avgTxPerBlock,
  avgBlockSize,
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
    </RoundedContainer>
  );
};

export default RollingStats;
