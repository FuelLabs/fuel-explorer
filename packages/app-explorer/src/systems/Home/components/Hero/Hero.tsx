import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';
import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import { useMemo } from 'react';
import {
  useDashboardBlocks,
  useHomeCharts,
  useRollingStats,
} from './hooks/useFuelExplorerStatus';
import { useTopEcosystem } from './hooks/useTopEcosystem';
import { heroStyles } from './styles';

import DataTable from '../../components/DataTable';
import DailyTransaction from '../DailyTransaction';
import GasSpentChart from '../GasSpentChart/index';
import RollingStats from '../RollingStats';
import TPSHourly from '../TPSHourly';
import TotalDapps from '../TotalDapps/TotalDapps';

function Hero() {
  const classes = heroStyles();
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
    const rollingStats60sData = (rollingData as any)?.rollingStats60s ?? {
      tps: 0,
      avgTxPerBlock: 0,
      avgGasPerBlock: 0,
      avgBlockSize: 0,
      peakTps: 0,
    };
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

  return (
    <Theme appearance="light">
      <Box className={classes.root()}>
        <Container className={classes.container()}>
          <VStack>
            <Heading as="h1" className={classes.title()}>
              Fuel Explorer
            </Heading>

            <Box className={classes.searchWrapper()}>
              {/* Row 1-2, Col 1-4: Daily Transactions */}
              <div className="row-span-2 col-span-12 laptop:col-span-4">
                <LoadingWrapper
                  isLoading={isChartsLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[284px] laptop:h-[294px]" />
                  }
                  regularEl={<DailyTransaction blocks={totalTpsData} />}
                />
              </div>

              {/* Row 1-2, Col 5-7: Fuel Dapps */}
              <div className="row-span-2 col-span-12 laptop:col-span-3">
                <LoadingWrapper
                  isLoading={isEcosystemLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[286px] laptop:h-[294px]" />
                  }
                  regularEl={
                    <TotalDapps
                      active={activeProjects}
                      total={totalProjects}
                      featured={top3Projects}
                    />
                  }
                />
              </div>

              {/* Row 1-4, Col 8-12: Latest Block + Recent Blocks */}
              <div className="row-span-4 col-span-12 laptop:col-span-5 flex flex-col gap-5">
                <LoadingWrapper
                  isLoading={isRollingLoading}
                  loadingEl={<LoadingBox className="w-full h-[120px]" />}
                  regularEl={
                    <RollingStats
                      tps={Number(rollingStats60sData.tps) || 0}
                      avgTxPerBlock={
                        Number(rollingStats60sData.avgTxPerBlock) || 0
                      }
                      avgBlockSize={
                        Number(rollingStats60sData.avgBlockSize) || 0
                      }
                    />
                  }
                />
                <div className="flex-1 min-h-0">
                  <LoadingWrapper
                    isLoading={isBlocksLoading}
                    loadingEl={
                      <LoadingBox className="w-full h-[480px] laptop:h-full" />
                    }
                    regularEl={<DataTable blocks={blocks.slice(0, 5)} />}
                  />
                </div>
              </div>

              {/* Row 3-4, Col 1-4: Hourly TPS */}
              <div className="row-span-2 col-span-12 laptop:col-span-4">
                <LoadingWrapper
                  isLoading={isChartsLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[284px] laptop:h-[309px]" />
                  }
                  regularEl={
                    <TPSHourly
                      tpsPerMinute={averageTpsPerMinuteData}
                      peakTps={Number(rollingStats60sData.peakTps) || 0}
                    />
                  }
                />
              </div>

              {/* Row 3-4, Col 5-7: Fee Spent */}
              <div className="row-span-2 col-span-12 laptop:col-span-3">
                <LoadingWrapper
                  isLoading={isChartsLoading}
                  loadingEl={<LoadingBox className="w-full h-[309px]" />}
                  regularEl={<GasSpentChart blocks={totalFeeData} />}
                />
              </div>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Theme>
  );
}

export default Hero;
