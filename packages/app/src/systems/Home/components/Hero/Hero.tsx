'use client';

import Image from 'next/image';
import { Box, Container } from 'pn-ui-primitives/Box';
import { Heading } from 'pn-ui-primitives/Heading';
import { Theme } from 'pn-ui-primitives/Theme';
import { SearchInput } from '~/systems/Core/components/SearchInput/SearchInput';

import styles from './Hero.module.css';

export function Hero() {
  return (
    <Theme appearance="dark">
      <Box className={styles.root}>
        <Container className={styles.container} size="sm">
          <Heading as="h1" className={styles.title}>
            Explore Fuel Network
          </Heading>
          <SearchInput className={styles.input} />
        </Container>
        <Box as="figure" className={styles.img}>
          <Box className={styles.imgWrapper}>
            <Image
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
