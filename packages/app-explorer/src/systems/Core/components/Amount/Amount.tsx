import type { BaseProps } from '@fuels/ui';
import { Icon, Text, useBreakpoints } from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
import type { BN } from 'fuels';
import { bn } from 'fuels';
import Image from 'next/image';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';

import { cx } from '../../utils/cx';
import { formatZeroUnits } from '../../utils/format';

type AmountProps =
  | BaseProps<{
      value?: BN | null;
      assetId?: string | null;
      hideIcon?: boolean;
      hideSymbol?: boolean;
      iconSize?: number;
    }>
  | BaseProps<{
      value?: BN | null;
      assetId?: never | null;
      hideIcon?: never | true;
      hideSymbol?: never | true;
      iconSize?: never;
    }>;

export function Amount({
  value,
  assetId,
  hideSymbol,
  hideIcon,
  className,
  iconSize = 18,
}: AmountProps) {
  const asset = useAsset(assetId ?? '');
  const fuelAsset = useFuelAsset(asset);
  const amount = bn(value);
  const { isMobile } = useBreakpoints();
  return (
    <Text
      as="div"
      className={cx(
        'text-secondary text-sm flex items-center gap-2',
        className,
      )}
    >
      {asset?.icon && !hideIcon ? (
        <Image
          src={asset.icon as string}
          width={iconSize}
          height={iconSize}
          alt={asset.name}
        />
      ) : (
        amount && <Icon icon={IconCoins} size={iconSize} color="text-muted" />
      )}
      {fuelAsset?.decimals ? (
        <>
          {bn(amount).format({
            precision: isMobile ? 3 : undefined,
            units: fuelAsset.decimals,
          })}{' '}
        </>
      ) : (
        formatZeroUnits(amount)
      )}
      {!hideSymbol && asset?.symbol}
    </Text>
  );
}
