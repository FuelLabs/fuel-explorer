'use client';

import { Box, Container, Heading, Theme } from '@fuels/ui';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { SearchInput } from '~/systems/Core/components/SearchInput/SearchInput';

export function Hero() {
  const classes = styles();
  return (
    <Theme appearance="dark">
      <Box className={classes.root()}>
        <Container className={classes.container()} size="4">
          <Heading as="h1" className={classes.title()}>
            Explore Fuel Network
          </Heading>
          <SearchInput className={classes.input()} />
        </Container>
        <Box as="figure" className={classes.img()}>
          <Box className={classes.imgWrapper()}>
            <Image
              priority
              alt="Fuel Brand Image"
              className={classes.imgChild()}
              height={680}
              quality={80}
              src="/brand-img.png"
              width={680}
            />
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}

const styles = tv({
  slots: {
    root: 'hero-bg overflow-clip relative w-full border-b border-border',
    container:
      'z-20 relative py-8 pt-6 px-8 tablet:py-28 tablet:pt-24 tablet:px-10',
    img: 'hidden absolute inset-0 tablet:block',
    imgChild: 'absolute -top-1/2 right-0',
    imgWrapper: 'absolute inset-0',
    input: 'w-full tablet:w-[400px]',
    title: [
      'text-2xl leading-snug text-white mb-4 justify-center',
      'tablet:text-left tablet:text-4xl tablet:justify-start',
    ],
  },
});
