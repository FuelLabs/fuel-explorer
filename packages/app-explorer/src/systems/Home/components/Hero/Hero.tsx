'use client';

import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';

import { tv } from 'tailwind-variants';
import Epoch from '../Epoch';
import { GasTracker } from '../GasTracker';
import { LatestBlock } from '../LatestBlock';
import { TPS } from '../TPS';
import { TrendingCardCarousel } from '../TrendingCardCarousel';

export function Hero() {
  const classes = styles();

  return (
    <Theme appearance="light">
      <Box className={classes.root()}>
        <Container className={classes.container()}>
          <VStack>
            <Heading as="h1" className={classes.title()}>
              Fuel Explorer
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
