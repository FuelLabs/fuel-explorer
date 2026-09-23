import { AnimatedNumber, RoundedContainer } from '@fuels/ui';
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
    <RoundedContainer className="py-4 px-5 flex flex-col">
      <div className="flex items-center">
        <span className="fuel-label">Live Stats</span>
        <span className="fuel-label ml-1.5">(60s)</span>
      </div>

      <div className="flex justify-between mt-3">
        <div>
          <AnimatedNumber
            value={tps}
            format={(v) => v.toFixed(2)}
            className="fuel-stat-sm block"
          />
          <span className="fuel-label">TPS</span>
        </div>
        <div>
          <AnimatedNumber
            value={avgTxPerBlock}
            format={(v) => v.toFixed(1)}
            className="fuel-stat-sm block"
          />
          <span className="fuel-label">TX / Block</span>
        </div>
        <div>
          <AnimatedNumber
            value={avgBlockSize}
            format={formatBytes}
            className="fuel-stat-sm block"
          />
          <span className="fuel-label">Block Size</span>
        </div>
      </div>
    </RoundedContainer>
  );
};

export default RollingStats;
