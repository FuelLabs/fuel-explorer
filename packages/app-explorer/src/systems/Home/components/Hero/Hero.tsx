'use client';

import {
  Box,
  Container,
  HStack,
  Heading,
  RoundedContainer,
  Theme,
  VStack,
} from '@fuels/ui';

import { tv } from 'tailwind-variants';
import { TableTile } from '../TableCell/TableTile';
import { ViewAllButton } from '../ViewAllButton/ViewAllButton';

export function Hero() {
  const classes = styles();
  const tiles = Array.from({ length: 4 }, (_, index) => (
    <TableTile key={index} />
  ));

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
            <HStack>{/* <TrendingCard /> */}</HStack>
          </VStack>
          <Box className={classes.searchWrapper()}>
            {/* <Epoch /> */}
            {/* <LatestBlock /> */}
            <RoundedContainer className="w-[33.3125rem]">
              {tiles}
              <ViewAllButton />
            </RoundedContainer>
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
    searchWrapper: 'max-w-[400px]',
  },
});
