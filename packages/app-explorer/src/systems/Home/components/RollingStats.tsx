import { AnimatedNumber, DitherImage, RoundedContainer } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <RoundedContainer className="fuel-illustrated relative overflow-hidden py-4 px-5 flex flex-col">
      <div className="fuel-dither-art">
        <DitherImage
          src="/illustrations/live-stats-race.jpg"
          cell={1}
          brightness={0.09}
        />
      </div>
      <div className="relative flex items-center">
        <span className="fuel-label">{t('home.live_stats')}</span>
        <span className="fuel-label ml-1.5">{t('home.live_stats_window')}</span>
      </div>

      <div className="relative flex justify-between mt-3">
        <div>
          <AnimatedNumber
            value={tps}
            format={(v) => v.toFixed(2)}
            className="fuel-stat-sm block"
          />
          <span className="fuel-label">{t('home.tps')}</span>
        </div>
        <div>
          <AnimatedNumber
            value={avgTxPerBlock}
            format={(v) => v.toFixed(1)}
            className="fuel-stat-sm block"
          />
          <span className="fuel-label">{t('home.tx_per_block')}</span>
        </div>
        <div className="text-right">
          <AnimatedNumber
            value={avgBlockSize}
            format={formatBytes}
            className="fuel-stat-sm block"
          />
          <span className="fuel-label">{t('home.block_size')}</span>
        </div>
      </div>
    </RoundedContainer>
  );
};

export default RollingStats;
