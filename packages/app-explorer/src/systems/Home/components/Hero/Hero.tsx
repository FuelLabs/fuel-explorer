import {
  Box,
  GridFrame,
  Heading,
  LoadingBox,
  LoadingWrapper,
  Reveal,
  Theme,
} from '@fuels/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDashboardBlocks,
  useHomeCharts,
  useRollingStats,
} from './hooks/useFuelExplorerStatus';
import { useTopEcosystem } from './hooks/useTopEcosystem';
import { heroStyles } from './styles';

import { useBlockApps } from '~/systems/Transactions/hooks/useBlockApps';
import DataTable from '../../components/DataTable';
import DailyTransaction from '../DailyTransaction';
import GasSpentChart from '../GasSpentChart/index';
import RollingStats from '../RollingStats';
import TPSHourly from '../TPSHourly';
import { TileUnavailable } from '../TileUnavailable';
import TotalDapps from '../TotalDapps/TotalDapps';

function Hero() {
  const classes = heroStyles();
  const { t } = useTranslation();
  const { isPending: isChartsLoading, data: chartsData } = useHomeCharts();
  const { isPending: isRollingLoading, data: rollingData } = useRollingStats();
  const { isPending: isBlocksLoading, data: blocksData } = useDashboardBlocks();
  const ecosystemProjects = useTopEcosystem();
  const isEcosystemLoading = ecosystemProjects.isPending;

  const {
    totalTpsData,
    averageTpsPerMinuteData,
    rollingStats60sData,
    totalFeeData,
    blocks,
    activeProjects,
    totalProjects,
    top3Projects,
  } = useMemo(() => {
    const totalTpsData = (chartsData as any)?.tps;
    const averageTpsPerMinuteData = (chartsData as any)?.averageTpsPerMinute;
    const rollingStats60sData = (rollingData as any)?.rollingStats60s;
    const totalFeeData = (chartsData as any)?.fee;
    const blocks = (blocksData as any)?.blocks || [];
    const activeProjects = (ecosystemProjects as any)?.activeProjects || 0;
    const totalProjects = (ecosystemProjects as any)?.totalProjects || 0;
    const top3Projects = (ecosystemProjects as any)?.top3Projects || [];

    return {
      totalTpsData,
      averageTpsPerMinuteData,
      rollingStats60sData,
      totalFeeData,
      blocks,
      activeProjects,
      totalProjects,
      top3Projects,
    };
  }, [ecosystemProjects, chartsData, rollingData, blocksData]);

  // A failed poll keeps the last good payload; only no data at all is unavailable.
  const chartsUnavailable = !isChartsLoading && !totalTpsData && !totalFeeData;
  const rollingUnavailable = !isRollingLoading && !rollingStats60sData;
  const blocksUnavailable = !isBlocksLoading && blocks.length === 0;
  const ecosystemUnavailable = !isEcosystemLoading && totalProjects === 0;

  const { top: mostUsed } = useBlockApps(
    blocks
      .slice(0, 4)
      .map((block: { blockNo: string | number }) => String(block.blockNo)),
  );

  return (
    <Theme appearance="light">
      <Box className={classes.root()}>
        <Box className={classes.container()}>
          <Heading as="h1" className="sr-only">
            Fuel Explorer
          </Heading>
          <GridFrame className={classes.searchWrapper()}>
            {/* Row 1-2, Col 1-4: Daily Transactions */}
            <Reveal className="row-span-2 col-span-12 laptop:col-span-4">
              <LoadingWrapper
                isLoading={isChartsLoading}
                noItems={chartsUnavailable}
                noItemsEl={
                  <TileUnavailable label={t('home.daily_transactions')} />
                }
                loadingEl={
                  <LoadingBox className="w-full h-[260px] laptop:h-[251px]" />
                }
                regularEl={<DailyTransaction blocks={totalTpsData} />}
              />
            </Reveal>

            {/* Row 1-2, Col 5-7: Fuel Dapps */}
            <Reveal
              delay={0.05}
              className="row-span-2 col-span-12 laptop:col-span-3"
            >
              <LoadingWrapper
                isLoading={isEcosystemLoading}
                noItems={ecosystemUnavailable}
                noItemsEl={<TileUnavailable label={t('home.fuel_dapps')} />}
                loadingEl={
                  <LoadingBox className="w-full h-[260px] laptop:h-[251px]" />
                }
                regularEl={
                  <TotalDapps
                    active={activeProjects}
                    total={totalProjects}
                    featured={mostUsed.length ? mostUsed : top3Projects}
                  />
                }
              />
            </Reveal>

            {/* Row 1-4, Col 8-12: Latest Block + Recent Blocks */}
            <Reveal
              delay={0.1}
              className="row-span-4 col-span-12 laptop:col-span-5 flex flex-col gap-px bg-[var(--fuel-line)]"
            >
              <LoadingWrapper
                isLoading={isRollingLoading}
                noItems={rollingUnavailable}
                noItemsEl={<TileUnavailable label={t('home.live_stats')} />}
                loadingEl={<LoadingBox className="w-full h-[120px]" />}
                regularEl={
                  <RollingStats
                    tps={Number(rollingStats60sData?.tps) || 0}
                    avgTxPerBlock={
                      Number(rollingStats60sData?.avgTxPerBlock) || 0
                    }
                    avgBlockSize={
                      Number(rollingStats60sData?.avgBlockSize) || 0
                    }
                  />
                }
              />
              <div className="flex-1 min-h-0">
                <LoadingWrapper
                  isLoading={isBlocksLoading}
                  noItems={blocksUnavailable}
                  noItemsEl={
                    <TileUnavailable label={t('home.recent_blocks')} />
                  }
                  loadingEl={
                    <LoadingBox className="w-full h-[384px] laptop:h-full" />
                  }
                  regularEl={<DataTable blocks={blocks.slice(0, 4)} />}
                />
              </div>
            </Reveal>

            {/* Row 3-4, Col 1-4: Hourly TPS */}
            <Reveal
              delay={0.15}
              className="row-span-2 col-span-12 laptop:col-span-4"
            >
              <LoadingWrapper
                isLoading={isChartsLoading}
                noItems={chartsUnavailable}
                noItemsEl={<TileUnavailable label={t('home.hourly_tps')} />}
                loadingEl={
                  <LoadingBox className="w-full h-[260px] laptop:h-[279px]" />
                }
                regularEl={
                  <TPSHourly
                    tpsPerMinute={averageTpsPerMinuteData}
                    peakTps={Number(rollingStats60sData?.peakTps) || 0}
                  />
                }
              />
            </Reveal>

            {/* Row 3-4, Col 5-7: Fee Spent */}
            <Reveal
              delay={0.2}
              className="row-span-2 col-span-12 laptop:col-span-3"
            >
              <LoadingWrapper
                isLoading={isChartsLoading}
                noItems={chartsUnavailable}
                noItemsEl={<TileUnavailable label={t('home.fee_spent')} />}
                loadingEl={
                  <LoadingBox className="w-full h-[270px] laptop:h-[279px]" />
                }
                regularEl={<GasSpentChart blocks={totalFeeData} />}
              />
            </Reveal>
          </GridFrame>
        </Box>
      </Box>
    </Theme>
  );
}

export default Hero;
