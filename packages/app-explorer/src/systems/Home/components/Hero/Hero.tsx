'use client';

import { Box, Container, Heading } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { SearchWidget } from '~/systems/Core/components/Search/SearchWidget';

export function Hero() {
  const classes = styles();

  return (
    <Box className={classes.root()}>
      <Container className={classes.container()} size="4">
        <Heading as="h1" className={classes.title()}>
          Explore Fuel
        </Heading>
        <Box className={classes.searchWrapper()}>
          <SearchWidget autoFocus={true} />
        </Box>
      </Container>
    </Box>
  );
}

const styles = tv({
  slots: {
    root: 'hero-bg overflow-clip relative w-full border-b border-border',
    container: [
      'z-20 relative py-8 pt-6 px-8 tablet:py-28 tablet:pt-24 tablet:px-10',
      'tablet:max-laptop:max-w-[500px] [&_.rt-ContainerInner]:p-2',
      '[&_.rt-ContainerInner]:tablet:max-laptop:bg-black [&_.rt-ContainerInner]:tablet:max-laptop:bg-opacity-60 [&_.rt-ContainerInner]:tablet:max-laptop:rounded-lg [&_.rt-ContainerInner]:tablet:max-laptop:shadow-2xl',
    ],
    input: 'w-full tablet:w-[400px]',
    title: [
      'text-2xl leading-snug text-white mb-4 justify-center',
      'tablet:text-left tablet:text-4xl tablet:justify-start',
    ],
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: 'max-w-[400px]',
  },
});
