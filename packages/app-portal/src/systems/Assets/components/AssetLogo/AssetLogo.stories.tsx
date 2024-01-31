import { cssObj } from '@fuel-ui/css';
import { CardList } from '@fuel-ui/react';
import assetList from '@fuels/assets';

import { AssetLogo } from './AssetLogo';

export default {
  component: AssetLogo,
  title: 'AssetLogo',
  parameters: {
    layout: 'fullscreen',
  },
};

export const ETH = () => {
  return (
    <CardList css={styles.storybook}>
      <AssetLogo asset={assetList[0]} />
    </CardList>
  );
};

export const Big = () => {
  return (
    <CardList css={styles.storybook}>
      <AssetLogo asset={assetList[0]} size={40} />
    </CardList>
  );
};

const generatedAsset = {
  ...assetList[0],
  icon: null,
  networks: [{ ...assetList[0].networks[0], address: '0x123123123123' }],
};
export const Generated = () => {
  return (
    <CardList css={styles.storybook}>
      <AssetLogo asset={generatedAsset} />
    </CardList>
  );
};

const styles = {
  storybook: cssObj({
    margin: '20px',
    width: '386px',
  }),
};
