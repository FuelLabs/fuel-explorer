import { cssObj } from '@fuel-ui/css';
import { CardList } from '@fuel-ui/react';
import { ethLogoSrc } from '~/systems/Chains';

import { EthAssetCard } from './EthAssetCard';

export default {
  component: EthAssetCard,
  title: 'EthAssetCard',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  return (
    <CardList css={styles.storybook}>
      <EthAssetCard imageSrc={ethLogoSrc} name="ETH" />
    </CardList>
  );
};

export const AvatarUsage = () => {
  return (
    <CardList css={styles.storybook}>
      <EthAssetCard
        name="ETH"
        hash="0x15db4a4d9e35fa8c0b5f92b13924d1610c5d618e"
      />
    </CardList>
  );
};

export const OnPress = () => {
  return (
    <CardList css={styles.storybook}>
      <EthAssetCard
        imageSrc={ethLogoSrc}
        name="ETH"
        onPress={() => {
          console.log('press');
        }}
      />
    </CardList>
  );
};

export const OnAdd = () => {
  return (
    <CardList css={styles.storybook}>
      <EthAssetCard
        imageSrc={ethLogoSrc}
        name="ETH"
        onAdd={() => {
          console.log('add');
        }}
      />
    </CardList>
  );
};

export const OnRemove = () => {
  return (
    <CardList css={styles.storybook}>
      <EthAssetCard
        imageSrc={ethLogoSrc}
        name="ETH"
        onRemove={() => {
          console.log('remove');
        }}
      />
    </CardList>
  );
};

export const OnRemoveDisabled = () => {
  return (
    <CardList css={styles.storybook}>
      <EthAssetCard
        isRemoveDisabled
        imageSrc={ethLogoSrc}
        name="ETH"
        onRemove={() => {
          console.log('remove');
        }}
      />
    </CardList>
  );
};

const styles = {
  storybook: cssObj({
    margin: '20px',
    width: '386px',
  }),
};
