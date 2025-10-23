import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';
import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import { useMemo } from 'react';
import { useFuelExplorerStatus } from './hooks/useFuelExplorerStatus';
import { useTopEcosystem } from './hooks/useTopEcosystem';
import { heroStyles } from './styles';

import DataTable from '../../components/DataTable';
import DailyTransaction from '../DailyTransaction';
import GasSpentChart from '../GasSpentChart/index';
import LatestBlock from '../LatestBlock';
import TPS from '../TPS';
import TotalDapps from '../TotalDapps/TotalDapps';

function Hero() {
  const classes = heroStyles();
  const { isPending: isLoading, data } = useFuelExplorerStatus();
  const ecosystemProjects = useTopEcosystem();

  const {
    totalTpsData,
    maxTpsData,
    totalFeeData,
    blocks,
    activeProjects,
    totalProjects,
    top3Projects,
    blockNo,
    blockHash,
    totalFeeInUsd,
  } = useMemo(() => {
    const totalTpsData = (data as any)?.tps;
    const maxTpsData = (data as any)?.maxTps;
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
    const blockHash = block?.blockHash ?? '';
    const totalFeeInUsd = block?.totalFeeInUsd ?? '';

    return {
      totalTpsData,
      maxTpsData,
      totalFeeData,
      blocks,
      blocksData,
      activeProjects,
      totalProjects,
      top3Projects,
      blockNo,
      blockHash,
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
              <div className="row-span-2 col-span-12 laptop:col-span-4">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[284px] laptop:h-[294px]" />
                  }
                  regularEl={<DailyTransaction blocks={totalTpsData} />}
                />
              </div>
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
              <div className="row-span-1 col-span-12 laptop:col-span-5">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[172px]" />}
                  regularEl={
                    <LatestBlock
                      blockNo={blockNo}
                      blockHash={blockHash}
                      totalFeeInUsd={totalFeeInUsd}
                    />
                  }
                />
              </div>
              <div className="col-span-12 row-span-3 laptop:col-span-5">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[432px] laptop:h-full" />
                  }
                  regularEl={<DataTable blocks={blocks.slice(0, 5)} />}
                />
              </div>

              <div className="row-span-2 col-span-12 laptop:col-span-4">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={
                    <LoadingBox className="w-full h-[284px] laptop:h-[309px]" />
                  }
                  regularEl={<TPS tps={maxTpsData} />}
                />
              </div>
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
