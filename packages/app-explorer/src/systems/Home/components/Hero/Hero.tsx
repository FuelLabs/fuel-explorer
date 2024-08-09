'use client';

import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';

import { tv } from 'tailwind-variants';
import { DailyTransaction } from '../DailyTransaction';
// import { TableTile } from '../TableCell/TableTile';
import { DataTable } from '../DataTable';
import Epoch from '../Epoch/Epoch';
import { GasSaved } from '../GasSaved';
import { GasTracker } from '../GasTracker';
import { LatestBlock } from '../LatestBlock/LatestBlock';
import { TPS } from '../TPS';
import { TrendingCardCarousel } from '../TrendingCardCarousel';

export function Hero() {
  const classes = styles();

  return (
    <Theme appearance="light">
      <Box className={classes.root()}>
        <Container className={classes.container()} size="4">
          <VStack>
            <Heading as="h1" className={classes.title()}>
              Explore Fuel
            </Heading>
            <Heading size="6" className={classes.title()}>
              Trending Items
            </Heading>
            <div className="pb-6">
              <TrendingCardCarousel />
            </div>
          </VStack>

          <Box className={classes.searchWrapper()}>
            <div className="row-span-2 col-span-4">
              <DailyTransaction />
            </div>
            <div className="row-span-1 col-span-3">
              <Epoch />
            </div>
            <div className="row-span-1 col-span-5">
              <LatestBlock />
            </div>
            <div className="row-span-1 col-span-3">
              <GasTracker />
            </div>
            <div className="row-span-3 col-span-5 ">
              <DataTable />
            </div>
            <div className="row-span-2 col-span-4">
              <TPS />
            </div>
            <div className="row-span-2 col-span-3">
              <GasSaved />
            </div>
          </Box>
        </Container>
      </Box>
    </Theme>
  );
}

const styles = tv({
  slots: {
    root: 'overflow-clip relative w-full border-b border-border bg-gray-3 dark:bg-black',
    container: [
      'z-20 relative py-8 pt-6 px-8 tablet:py-28 tablet:pt-24 tablet:px-10',
      'tablet:max-laptop:max-w-[500px] [&_.rt-ContainerInner]:p-2',
      ' [&_.rt-ContainerInner]:tablet:max-laptop:bg-opacity-60 [&_.rt-ContainerInner]:tablet:max-laptop:rounded-lg [&_.rt-ContainerInner]:tablet:max-laptop:shadow-2xl',
    ],
    input: 'w-full tablet:w-[400px]',
    title: [
      'text-2xl leading-snug text-heading justify-center',
      'tablet:text-left tablet:text-4xl tablet:justify-start',
    ],
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: 'grid grid-cols-12 grid-rows-auto auto-rows-min gap-5',
  },
});
