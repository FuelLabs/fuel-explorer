import { AnimatedNumber, DitherImage, RoundedContainer } from '@fuels/ui';
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
    <RoundedContainer className="relative overflow-hidden py-4 px-5 flex flex-col">
      <div className="fuel-dither-art">
        <DitherImage
          src="/illustrations/live-stats-race.jpg"
          cell={1}
          brightness={0.09}
        />
      </div>
      <div className="relative flex items-center">
        <span className="fuel-label">Live Stats</span>
        <span className="fuel-label ml-1.5">(60s)</span>
      </div>

      <div className="relative flex justify-between mt-3">
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
        <div className="text-right">
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
