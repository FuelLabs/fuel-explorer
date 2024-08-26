import { assets } from '@fuel-ts/account';

import { CardList } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { AssetCard } from './AssetCard';

export default {
  component: AssetCard,
  title: 'AssetCard',
  parameters: {
    layout: 'fullscreen',
  },
};
// TODO: fix stories
export const Usage = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard asset={assets[0]} />
    </CardList>
  );
};

export const AvatarUsage = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard asset={assets[0]} />
    </CardList>
  );
};

export const OnPress = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard
        asset={assets[0]}
        onClick={() => {
          const _classes = styles();

          console.log('press');
        }}
      />
    </CardList>
  );
};

export const OnAdd = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard
        asset={assets[0]}
        onAdd={() => {
          const _classes = styles();

          console.log('add');
        }}
      />
    </CardList>
  );
};

export const OnRemove = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard
        asset={assets[0]}
        onRemove={() => {
          const _classes = styles();

          console.log('remove');
        }}
      />
    </CardList>
  );
};

export const OnFaucet = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard
        asset={assets[0]}
        onFaucet={() => {
          const _classes = styles();

          console.log('faucet');
        }}
      />
    </CardList>
  );
};

export const OnRemoveDisabled = () => {
  const classes = styles();

  return (
    <CardList className={classes.storybook()}>
      <AssetCard
        isRemoveDisabled
        asset={assets[0]}
        onRemove={() => {
          console.log('remove');
        }}
      />
    </CardList>
  );
};

export const styles = tv({
  slots: {
    storybook: ['m-4 w-[386px]'],
  },
});
