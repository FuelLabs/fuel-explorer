'use client';

import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';

import { GQLTpsQuery } from '@fuel-explorer/graphql';
import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { DataTable } from '../../components/DataTable';
import { Block } from '../../interface/blocks.interface';
import { DailyTransaction } from '../DailyTransaction';
// import Epoch from '../Epoch';
import { GasSpentChart } from '../GasSpentChart';
import { GasTracker } from '../GasTracker';
import { LatestBlock } from '../LatestBlock';
import { TPS } from '../TPS';
import TotalDapps from '../TotalDapps/totalDapps';
import { getTPS } from './actions/get-tps';

export function Hero() {
  const classes = styles();
  const [tpsData, setTPSData] = useState<GQLTpsQuery['tps'] | null>(null);
  const getTPSData = async () => {
    try {
      const result: GQLTpsQuery = await getTPS({});
      setTPSData(result.tps);
      console.log('Here is the tps data', result.tps);
      console.log(result);
    } catch (e) {
      console.error('The error while fetching TPS is', e);
    }
  };
  useEffect(() => {
    getTPSData();
  }, []);

  const blocks: Block[] =
    tpsData?.nodes.map((node) => ({
      blockNo: node.blockNo ?? '',
      producer: node.producer ?? '',
      timeStamp: node.timestamp,
      gasUsed: node.gasUsed,
      tps: node.tps,
    })) || [];
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
              <div className="row-span-2 col-span-4">
                <DailyTransaction blocks={blocks} />
              </div>
              <div className="row-span-1 col-span-3">
                <TotalDapps active={21} total={48} />
              </div>
              <div className="row-span-1 col-span-5">
                <LatestBlock
                  blockNo={
                    tpsData?.nodes[0].blockNo?.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    ) ?? ''
                  }
                  gasUsed={tpsData?.nodes[0].gasUsed!}
                  producer={tpsData?.nodes[0].producer!}
                  timeStamp={tpsData?.nodes[0].timestamp!}
                  // tps={tpsData?.nodes[0].tps!}
                />
              </div>
              <div className="row-span-1 col-span-3">
                <GasTracker />
              </div>
              <div className="row-span-3 col-span-5 ">
                <DataTable blocks={blocks.slice(0, 5)} />
              </div>
              <div className="row-span-2 col-span-4">
                <TPS blocks={blocks} />
                {/* <TPSChart /> */}
              </div>
              <div className="row-span-2 col-span-3">
                <GasSpentChart blocks={blocks} />
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
      'lg:grid-cols-12 lg:grid-rows-[auto,auto]',
      'gap-y-5 gap-x-4',
    ],
  },
});
