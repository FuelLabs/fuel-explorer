import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';

import { EcosystemTags } from './EcosystemTags';

export default {
  component: EcosystemTags,
  title: 'Ecosystem / EcosystemTags',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const TAGS = [
    'DeFi',
    'NFTs',
    'DAOs',
    'Social',
    'Lending',
    'Games',
    'DEX',
    'Stablecoins',
    'Infrastructure',
  ];

  return (
    <Box.Flex align="center" justify="flex-start" css={styles.storybook}>
      <EcosystemTags tags={TAGS} />
    </Box.Flex>
  );
};

export const Loader = () => (
  <Box.Flex align="center" justify="flex-start" css={styles.storybook}>
    <EcosystemTags.Loading />
  </Box.Flex>
);

const styles = {
  storybook: cssObj({
    margin: '20px',
  }),
};
