'use client';

import { Box, Container } from '@fuel-explorer/ui/Box';
import { Heading } from '@fuel-explorer/ui/Heading';
import { Theme } from '@fuel-explorer/ui/Theme';
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
              className={classes.imgChild()}
              src="/brand-img.png"
              alt="Fuel Brand Image"
              width={680}
              height={680}
              priority
              quality={80}
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
    container: 'z-20 relative py-8 px-8 md:py-28 md:px-10',
    img: 'hidden absolute inset-0 md:block',
    imgChild: 'absolute -top-1/2 right-0',
    imgWrapper: 'absolute inset-0',
    input: 'w-full md:w-[400px]',
    title: [
      'text-center text-2xl text-white mb-4 justify-center',
      'md:text-left md:text-4xl md:justify-start',
    ],
  },
});
