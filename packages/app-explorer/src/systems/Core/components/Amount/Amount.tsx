import type { BaseProps } from '@fuels/ui';
import { Icon, Text, useBreakpoints } from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
import type { BN } from 'fuels';
import { bn } from 'fuels';

import { useAsset } from '~/systems/Asset/hooks/useAsset';

import type { GQLAsset } from '@fuel-explorer/graphql';
import { formatZeroUnits, useFuelAsset } from 'app-commons';
import { useMemo } from 'react';
import { cx } from '../../utils/cx';
import { AssetSymbol } from '../AssetSymbol/AssetSymbol';

type AmountProps =
  | BaseProps<{
      value?: BN | null;
      assetId?: string | null;
      hideIcon?: boolean;
      hideSymbol?: boolean;
      iconSize?: number;
      decimals?: string;
      asset?: Omit<GQLAsset, '__typename'> | null;
    }>
  | BaseProps<{
      value?: BN | null;
      assetId?: never | null;
      hideIcon?: never | true;
      hideSymbol?: never | true;
      iconSize?: never;
      decimals?: string;
      asset?: Omit<GQLAsset, '__typename'> | null;
    }>;

export function Amount({
  value,
  assetId,
  hideSymbol,
  hideIcon,
  className,
  iconSize = 18,
  decimals: decimalsProp,
  asset: assetMetadata,
}: AmountProps) {
  const asset = useAsset(assetId ?? '');
  const fuelAsset = useFuelAsset(asset);
  const amount = bn(value);
  const { isMobile } = useBreakpoints();
  const { icon, name, decimals, symbol } = useMemo(() => {
    const icon = asset?.icon || assetMetadata?.icon;
    const name = asset?.name || assetMetadata?.name;
    const decimals = Number(
      decimalsProp || fuelAsset?.decimals || assetMetadata?.decimals,
    );
    const symbol = asset?.symbol || assetMetadata?.symbol;

    return { icon, name, decimals, symbol };
  }, [asset, assetMetadata, decimalsProp, fuelAsset?.decimals]);

  return (
    <Text
      as="div"
      className={cx(
        'text-secondary text-sm flex items-center gap-2',
        className,
      )}
    >
      {icon && !hideIcon ? (
        <img
          src={icon as string}
          width={iconSize}
          height={iconSize}
          alt={name || ''}
        />
      ) : (
        amount && (
          <Icon icon={IconCoins} size={iconSize} className={className} />
        )
      )}
      {decimals ? (
        <>
          {bn(amount).format({
            precision: isMobile ? 3 : undefined,
            units: decimals,
          })}{' '}
        </>
      ) : (
        formatZeroUnits(amount)
      )}
      {assetMetadata && !hideSymbol ? (
        <AssetSymbol asset={assetMetadata} assetId={assetId || ''} />
      ) : !hideSymbol ? (
        symbol
      ) : null}
    </Text>
  );
}
