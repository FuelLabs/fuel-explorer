import { cssObj } from '@fuel-ui/css';
import { Box, Container, Heading } from '@fuel-ui/react';
import Image from 'next/image';
import { SearchInput } from '~/systems/Core/components/SearchInput/SearchInput';

export function Hero() {
  return (
    <Box css={styles.root}>
      <Container css={styles.container} size="sm">
        <Heading as="h1" css={styles.title}>
          Explore Fuel Network
        </Heading>
        <SearchInput css={styles.input} />
      </Container>
      <Box as="figure" css={styles.img}>
        <Box css={styles.imgWrapper}>
          <Image
            src="/brand-img.jpeg"
            alt="Fuel Brand Image"
            width={680}
            height={680}
            placeholder="blur"
            priority
            quality={80}
          />
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  root: cssObj({
    overflow: 'clip',
    position: 'relative',
    width: '100%',
    background: 'url(/logo-faded.svg) no-repeat -40px center',
    backgroundSize: 'auto 100%',
    borderBottom: '1px solid $border',
  }),
  container: cssObj({
    position: 'relative',
    zIndex: 1,
    py: '$14',
    px: '$8',

    '@md': {
      py: '$24',
      px: '$16',
    },
  }),
  img: cssObj({
    display: 'none',
    position: 'absolute',
    right: '0',
    top: '0',
    transform: 'translate(10%, -25%)',

    '@md': {
      display: 'block',
    },
  }),
  imgWrapper: cssObj({
    position: 'relative',

    '&::before': {
      display: 'block',
      content: '""',
      width: '70%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      background:
        'linear-gradient(to right, $bodyBg 0%, $bodyBg 40%, $blackA1 100%)',
    },

    '@lg': {
      '&::before': {
        width: '40%',
        background: 'linear-gradient(to right, $bodyBg, $blackA1)',
      },
    },
  }),
  title: cssObj({
    textAlign: 'center',
    fontSize: '$3xl',
    lineHeight: '1',

    '@md': {
      textAlign: 'left',
      fontSize: '$4xl',
    },
  }),
  input: cssObj({
    width: '100%',

    '@md': {
      width: '400px',
    },
  }),
};
