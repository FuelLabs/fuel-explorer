import { bn } from '@fuel-ts/math';
import type { BNInput } from '@fuel-ts/math';
import type { Asset as FuelsAsset } from '@fuels/assets';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import { useStrictedChildren } from '../../hooks/useStrictedChildren';
import { createComponent, withNamespace } from '../../utils/component';
import { cx } from '../../utils/css';
import type { PropsOf } from '../../utils/types';
import { Box, Flex, HStack } from '../Box';
import type { HStackProps } from '../Box';
import type { TextProps } from '../Text/Text';
import { Text } from '../Text/Text';

import { styles } from './styles';
import { AssetProvider, useAssetContext } from './useAssetContext';
import { useEthAsset } from './useEthAsset';
import { useFuelAsset } from './useFuelAsset';

export type AssetIconSize = 'xs' | 'sm' | 'md' | 'lg';

export type AssetProps = HStackProps & {
  asset?: FuelsAsset;
  name?: string;
  symbol?: string;
  imageUrl?: string;
  amount?: BNInput;
  decimals?: number;
  precision?: number;
  iconSize?: AssetIconSize | number;
  negative?: boolean;
  hideIcon?: boolean;
};

export type AssetIconProps = Omit<
  Omit<PropsOf<'img'>, 'width' | 'height' | 'color'> & { icon?: ReactNode },
  'children'
>;

export type AssetNameProps = Omit<PropsOf<'span'>, 'children'>;
export type AssetSymbolProps = PropsOf<'span'>;
export type AssetAmountProps = Omit<
  TextProps,
  'leftIcon' | 'rightIcon' | 'iconColor'
>;

const CHILD_ITEMS = [
  'AssetIcon',
  'AssetSymbol',
  'AssetName',
  'AssetAmount',
  'HStack',
  'VStack',
];

export const AssetRoot = createComponent<AssetProps, 'div'>({
  id: 'AssetRoot',
  render: (
    _,
    {
      asset,
      amount,
      name,
      symbol,
      imageUrl,
      decimals,
      precision,
      iconSize,
      negative,
      hideIcon,
      children,
      gap = '4',
      ...props
    },
  ) => {
    {
      const fuelAsset = useFuelAsset(asset);
      const ethAsset = useEthAsset(asset);
      const assetNetwork = fuelAsset || ethAsset;

      const assetName = assetNetwork?.name || name || 'Unknown';
      const assetSymbol = assetNetwork?.symbol || symbol || 'TKN';
      const assetDecimals = assetNetwork?.decimals || decimals || 0;
      const assetImageUrl = assetNetwork?.icon || imageUrl;

      const newChildren = useStrictedChildren('Asset', CHILD_ITEMS, children);
      const amountStr = bn(amount).format({ units: assetDecimals, precision });
      const isNegative = negative || bn(amount).lt(0);

      return (
        <AssetProvider
          value={{
            iconSize,
            asset,
            assetNetwork,
            name: assetName,
            symbol: assetSymbol,
            decimals: assetDecimals,
            imageUrl: assetImageUrl,
            precision,
            hideIcon,
            amount,
            amountStr,
            isNegative,
          }}
        >
          <HStack {...props} align="center" gap={gap}>
            {newChildren}
          </HStack>
        </AssetProvider>
      );
    }
  },
});

export const AssetIcon = createComponent<AssetIconProps, 'img'>({
  id: 'AssetIcon',
  render: (_, { icon, className, ...props }) => {
    const classes = styles();
    const { name, imageUrl, symbol, iconSize = 'md' } = useAssetContext();

    function getDataSize() {
      if (typeof iconSize === 'number') {
        if (iconSize <= 24) {
          return 'xs';
        }
        if (iconSize <= 32) {
          return 'sm';
        }
        if (iconSize <= 36) {
          return 'md';
        }
        return 'lg';
      }
      return iconSize;
    }
    const dataSize = getDataSize();

    if (icon) {
      return (
        <Box asChild aria-label={`${name} icon`} role="img" {...props}>
          <span>{icon}</span>
        </Box>
      );
    }

    let imageProps = {};
    if (typeof iconSize === 'number') {
      imageProps = {
        width: `${iconSize}px`,
        height: `${iconSize}px`,
      };
    }

    if (imageUrl) {
      return (
        // biome-ignore lint: false positive asking for `alt` but it was informed before {...props}
        <img
          className={cx(className, classes.iconImage())}
          data-size={dataSize}
          src={imageUrl}
          alt={`${name} logo`}
          style={{ ...imageProps }}
          {...props}
        />
      );
    }

    return (
      <Flex
        className={classes.iconWritten()}
        data-size={dataSize}
        style={{ ...imageProps }}
      >
        <Text className={classes.iconText()} data-size={dataSize}>
          {symbol?.slice(0, 2).toUpperCase()}
        </Text>
      </Flex>
    );
  },
});

export const AssetSymbol = createComponent<AssetSymbolProps, 'span'>({
  id: 'AssetSymbol',
  render: (_, props) => {
    const { symbol } = useAssetContext();
    return <span {...props}>{symbol}</span>;
  },
});

export const AssetName = createComponent<AssetNameProps, 'span'>({
  id: 'AssetName',
  render: (_, props) => {
    const { name } = useAssetContext();
    return <span {...props}>{name}</span>;
  },
});

export const AssetAmount = createComponent<AssetAmountProps, 'span'>({
  id: 'AssetAmount',
  render: (_, props) => {
    const { hideIcon, amountStr, isNegative } = useAssetContext();
    return (
      <Text
        {...props}
        iconColor={isNegative ? 'text-red-8' : 'text-brand'}
        {...(!hideIcon && {
          leftIcon: isNegative ? IconArrowDown : IconArrowUp,
        })}
      >
        {amountStr}
      </Text>
    );
  },
});

export const Asset = withNamespace(AssetRoot, {
  Amount: AssetAmount,
  Icon: AssetIcon,
  Name: AssetName,
  Symbol: AssetSymbol,
});
