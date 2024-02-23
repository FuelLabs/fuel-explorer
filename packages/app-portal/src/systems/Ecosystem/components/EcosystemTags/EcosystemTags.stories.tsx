import { Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { EcosystemTags } from './EcosystemTags';

export default {
  component: EcosystemTags,
  title: 'Ecosystem / EcosystemTags',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();
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
    <Flex align="center" justify="start" className={classes.storybook()}>
      <EcosystemTags tags={TAGS} />
    </Flex>
  );
};

export const Loader = () => {
  const classes = styles();
  return (
    <Flex align="center" justify="start" className={classes.storybook()}>
      <EcosystemTags.Loading />
    </Flex>
  );
};

export const styles = tv({
  slots: {
    storybook: 'm-6',
  },
});
