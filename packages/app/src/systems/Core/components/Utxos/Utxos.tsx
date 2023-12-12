import type { UtxoItem as TUtxoItem } from '@fuel-explorer/graphql';
import {
  Text,
  Address,
  Icon,
  Collapsible,
  useBreakpoints,
  Box,
} from '@fuels/ui';
import type { BoxProps } from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { FixedSizeList as List } from 'react-window';
import { tv } from 'tailwind-variants';
import { Routes } from '~/routes';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';

import { formatZeroUnits } from '../../utils/format';

export type UtxoItem = Partial<Omit<TUtxoItem, '__typename'>>;

type UtxoItemProps = {
  item: UtxoItem;
  assetId?: string;
  style?: React.CSSProperties;
  index: number;
};

function UtxoItem({ item, style, assetId, index }: UtxoItemProps) {
  const { isMobile } = useBreakpoints();
  const asset = useAsset(assetId);
  const fuelAsset = useFuelAsset(asset);

  if (!item.utxoId) return null;
  if (!asset) return null;

  const trim = isMobile ? 8 : 16;
  const { item: itemStyle } = styles({
    color: index % 2 !== 0 ? 'odd' : undefined,
  });

  return (
    <Box style={style} className={itemStyle()}>
      <Address
        prefix="ID:"
        value={item.utxoId}
        className="flex-col items-start gap-1 flex-1 tablet:flex-row tablet:items-center tablet:gap-4"
        addressOpts={{ trimLeft: trim, trimRight: trim }}
        linkProps={{
          as: NextLink,
          href: Routes.txSimple(item.utxoId.slice(0, -2)),
        }}
      />
      <Text className="text-xs text-secondary flex items-center gap-2">
        <Icon icon={IconCoins} size={14} />{' '}
        {fuelAsset?.decimals ? (
          <>
            {bn(item.amount).format({
              precision: isMobile ? 3 : undefined,
              units: fuelAsset.decimals,
            })}{' '}
          </>
        ) : (
          formatZeroUnits(item.amount || '')
        )}
      </Text>
    </Box>
  );
}

type UtxosProps = BoxProps & {
  assetId?: string;
  items?: UtxoItem[] | null;
};

function VirtualList({ items, assetId }: UtxosProps) {
  const { isMobile } = useBreakpoints();
  const itemSize = isMobile ? 85 : 35;
  const len = items?.length ?? 0;
  return (
    <List
      height={len >= 10 ? 350 : itemSize * len}
      itemCount={items?.length ?? 0}
      width="100%"
      itemSize={itemSize}
    >
      {({ index: idx, style }) => {
        const item = items?.[idx];
        return (
          item && (
            <UtxoItem
              key={item.utxoId}
              style={style}
              item={item}
              assetId={assetId}
              index={idx}
            />
          )
        );
      }}
    </List>
  );
}

export function Utxos({ items, assetId, ...props }: UtxosProps) {
  return (
    <Collapsible.Content {...props}>
      <Collapsible.Title leftIcon={IconCoins} iconColor="text-icon">
        UTXOs ({items?.length ?? 0})
      </Collapsible.Title>
      <Collapsible.Body className="p-0">
        <VirtualList items={items} assetId={assetId} />
      </Collapsible.Body>
    </Collapsible.Content>
  );
}

const styles = tv({
  slots: {
    item: [
      'flex flex-col p-2 px-4 gap-2',
      'tablet:flex-row',
      'last:rounded-b-sm',
      'fuel-[Address]:text-[0.8rem] fuel-[Address]:leading-none',
    ],
  },
  variants: {
    color: {
      odd: {
        item: 'bg-gray-4',
      },
    },
  },
});
