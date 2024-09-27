'use client';

import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';

import { LoadingBox, LoadingWrapper } from '@fuels/ui';
import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import projectJson from '../../../../../../app-portal/src/systems/Ecosystem/data/projects.json';
import { DataTable } from '../../components/DataTable';
import { Block } from '../../interface/blocks.interface';
import DailyTransaction from '../DailyTransaction';
import { GasSpentChart } from '../GasSpentChart';
import { LatestBlock } from '../LatestBlock';
import { TPS } from '../TPS';
import TotalDapps from '../TotalDapps/TotalDapps';
import { getBlocksDashboard } from './actions/get-blocks-dashboard';
import { getTPS } from './actions/get-tps';

export function Hero() {
  const classes = styles();
  const [isLoading, setIsLoading] = useState(true);
  const [tpsData, setTpsData] = useState<any>(null);
  const [blocksData, setBlocksData] = useState<any>(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const getTPSData = async () => {
    try {
      const result = await getTPS();
      const dashboard = await getBlocksDashboard();

      setTpsData(result);

      setBlocksData(dashboard);

      if (isFirstFetch) {
        setIsLoading(false); // Set loading to false only after first fetch
        setIsFirstFetch(false); // Mark that the first fetch is done
      }
    } catch (_e) {}
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTPSData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const blocks: Block[] =
    blocksData?.getBlocksDashboard.nodes.map((node: any) => ({
      blockNo: node.blockNo ?? '',
      producer: node.producer ?? '',
      timeStamp: node.timestamp,
      gasUsed: node.gasUsed,
      tps: node.tps,
    })) || [];

  const tps: any =
    tpsData?.tps.nodes.map((node: any) => ({
      start: node.start ?? '',
      end: node.end ?? '',
      totalGas: node.totalGas,
      txCount: node.txCount,
    })) || [];

  const dailyTsxData = tps?.map((t: any) => ({
    time: t.start ?? '',
    value: t.txCount,
  }));

  const tpsTsxData = tps?.map((t: any) => ({
    time: t.start ?? '',
    value: t.txCount,
  }));

  const totalProjects = projectJson.length;
  const activeProjects = projectJson.filter(
    (item) => item.isLive === true,
  ).length;

  const elementsWithImage = projectJson.filter((item) => item.image);

  const top3Projects = elementsWithImage
    .filter((element) => element.isFeatured && element.isLive)
    .slice(0, 3);

  return (
    <Theme appearance="light">
      <Box className={classes.root()}>
        <Container className={classes.container()}>
          <VStack>
            <Heading as="h1" className={classes.title()}>
              Fuel Explorer
            </Heading>
            {/* <Heading size="6" className={classes.title()}>
              Trending Items
            </Heading>
            <div className="pb-6">
              <TrendingCardCarousel />
            </div> */}

            <Box className={classes.searchWrapper()}>
              <div className="row-span-2 col-span-6 sm:col-span-4">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[12rem]" />}
                  regularEl={<DailyTransaction blocks={dailyTsxData} />}
                />
              </div>
              <div className="row-span-2 col-span-6 sm:col-span-3">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[12rem]" />}
                  regularEl={
                    <TotalDapps
                      active={activeProjects}
                      total={totalProjects}
                      featured={top3Projects}
                    />
                  }
                />
              </div>
              <div className="row-span-1 col-span-6 sm:col-span-5">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[12rem]" />}
                  regularEl={
                    <LatestBlock
                      blockNo={
                        blocksData?.getBlocksDashboard.nodes[0].blockNo
                          ? blocksData.getBlocksDashboard.nodes[0].blockNo
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : ''
                      }
                      gasUsed={
                        blocksData?.getBlocksDashboard.nodes[0].gasUsed ?? ''
                      }
                      producer={
                        blocksData?.getBlocksDashboard.nodes[0].producer ?? ''
                      }
                      timeStamp={
                        blocksData?.getBlocksDashboard.nodes[0].timestamp ?? ''
                      }
                      // tps={tpsData?.nodes[0].tps ?? ''}
                    />
                  }
                />
              </div>
              <div className={`${'col-span-6 row-span-3 sm:col-span-5'} `}>
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-full" />}
                  regularEl={<DataTable blocks={blocks.slice(0, 5)} />}
                />
              </div>

              <div className="row-span-2 col-span-6 sm:col-span-4">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[12rem]" />}
                  regularEl={<TPS blocks={tpsTsxData} />}
                />
                {/* <TPSChart /> */}
              </div>
              <div className="row-span-2 col-span-6 sm:col-span-3">
                <LoadingWrapper
                  isLoading={isLoading}
                  loadingEl={<LoadingBox className="w-full h-[12rem]" />}
                  regularEl={<GasSpentChart blocks={dailyTsxData} />}
                />
              </div>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Theme>
  );
}

const styles = tv({
  slots: {
    root: 'overflow-clip relative w-full border-border bg-gray-3 dark:bg-gray-1',
    container: [
      'z-20 relative py-8 pt-6 px-8 tablet:pt-18 tablet:px-10',
      'tablet:max-laptop:max-w-[500px] [&_.rt-ContainerInner]:p-2',
      ' [&_.rt-ContainerInner]:tablet:max-laptop:bg-opacity-60 [&_.rt-ContainerInner]:tablet:max-laptop:rounded-lg [&_.rt-ContainerInner]:tablet:max-laptop:shadow-2xl',
    ],
    input: 'w-full tablet:w-[400px]',
    title: [
      'text-2xl leading-snug text-heading justify-center',
      'tablet:text-left tablet:text-4xl tablet:justify-start',
    ],
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: [
      'grid gap-5',
      'grid-cols-1 grid-rows-auto auto-rows-min',
      'md:grid-cols-1 md:grid-rows-[auto,auto]',
      'lg:grid-cols-12 lg:grid-rows-[repeat(4,auto)]',
      'gap-y-5 gap-x-4',
      'sm:grid-cols-1',
    ],
  },
});
