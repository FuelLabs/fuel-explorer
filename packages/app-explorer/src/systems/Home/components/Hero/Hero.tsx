import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';
import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import { useMemo } from 'react';
import { useFuelExplorerStatus } from './hooks/useFuelExplorerStatus';
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
  const { isPending: isLoading, data } = useFuelExplorerStatus();
  const ecosystemProjects = useTopEcosystem();

  const {
    totalTpsData,
    averageTpsPerMinuteData,
    rollingStats60sData,
    totalFeeData,
    blocks,
    activeProjects,
    totalProjects,
    top3Projects,
    blockNo,
    totalFeeInUsd,
  } = useMemo(() => {
    const totalTpsData = (data as any)?.tps;
    const averageTpsPerMinuteData = (data as any)?.averageTpsPerMinute;
    const rollingStats60sData = (data as any)?.rollingStats60s ?? {
      tps: 0,
      avgTxPerBlock: 0,
      avgGasPerBlock: 0,
      avgBlockSize: 0,
      peakTps: 0,
    };
    const totalFeeData = (data as any)?.fee;
    const blocks = (data as any)?.blocks || [];
    const blocksData = (data as any)?.blocksData;
    const activeProjects = (ecosystemProjects as any)?.activeProjects || 0;
    const totalProjects = (ecosystemProjects as any)?.totalProjects || 0;
    const top3Projects = (ecosystemProjects as any)?.top3Projects || [];
    const blockNo = blocksData?.getBlocksDashboard?.nodes?.[0]?.blockNo
      ? blocksData.getBlocksDashboard.nodes[0].blockNo
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : '';
    const block = blocksData?.getBlocksDashboard.nodes[0];
    const totalFeeInUsd = block?.totalFeeInUsd ?? '';

    return {
      totalTpsData,
      averageTpsPerMinuteData,
      rollingStats60sData,
      totalFeeData,
      blocks,
      blocksData,
      activeProjects,
      totalProjects,
      top3Projects,
      blockNo,
      totalFeeInUsd,
    };
  }, [ecosystemProjects, data]);

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
                  isLoading={isLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[284px] laptop:h-[294px]" />
                  }
                  regularEl={<DailyTransaction blocks={totalTpsData} />}
                />
              </div>

              {/* Row 1-2, Col 5-7: Fuel Dapps */}
              <div className="row-span-2 col-span-12 laptop:col-span-3">
                <LoadingWrapper
                  isLoading={isLoading}
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
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[200px]" />}
                  regularEl={
                    <RollingStats
                      tps={Number(rollingStats60sData.tps) || 0}
                      avgTxPerBlock={
                        Number(rollingStats60sData.avgTxPerBlock) || 0
                      }
                      avgBlockSize={
                        Number(rollingStats60sData.avgBlockSize) || 0
                      }
                      blockNo={blockNo}
                      totalFeeInUsd={totalFeeInUsd}
                    />
                  }
                />
                <div className="flex-1 min-h-0">
                  <LoadingWrapper
                    isLoading={isLoading}
                    loadingEl={<LoadingBox className="w-full h-full" />}
                    regularEl={<DataTable blocks={blocks.slice(0, 4)} />}
                  />
                </div>
              </div>

              {/* Row 3-4, Col 1-4: Hourly TPS */}
              <div className="row-span-2 col-span-12 laptop:col-span-4">
                <LoadingWrapper
                  isLoading={isLoading}
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
                  isLoading={isLoading}
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
