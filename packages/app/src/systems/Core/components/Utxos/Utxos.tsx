import type { UtxoItem as TUtxoItem } from '@fuel-explorer/graphql';
import {
  Text,
  Address,
  Icon,
  Collapsible,
  useBreakpoints,
  Box,
  ScrollArea,
} from '@fuels/ui';
import type { BoxProps } from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';

import { formatZeroUnits } from '../../utils/format';

export type UtxoItem = Partial<Omit<TUtxoItem, '__typename'>>;

type UtxoItemProps = {
  item: UtxoItem;
  assetId?: string;
  style?: React.CSSProperties;
};

function UtxoItem({ item, style, assetId }: UtxoItemProps) {
  const { isMobile } = useBreakpoints();
  const asset = useAsset(assetId);
  const fuelAsset = useFuelAsset(asset);

  if (!item.utxoId) return null;
  if (!asset) return null;

  const classes = styles();
  const trim = isMobile ? 8 : 16;
  return (
    <Box style={style} className={classes.item()}>
      <Address
        prefix="ID:"
        value={item.utxoId}
        className="flex-col items-start gap-1 flex-1 tablet:flex-row tablet:items-center tablet:gap-4"
        addressOpts={{ trimLeft: trim, trimRight: trim }}
        linkProps={{ as: NextLink, href: `/tx/${item.utxoId.slice(0, -2)}` }}
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

function CommonList({ items, assetId }: UtxosProps) {
  const [lastItemIdx, setLastItemIdx] = useState(9);

  function handleScroll(e: SyntheticEvent) {
    const target = e.target as HTMLElement;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      setLastItemIdx(lastItemIdx + 10);
    }
  }

  console.log(`items?.length`, items?.length);

  return (
    <ScrollArea
      scrollbars="vertical"
      onScroll={handleScroll}
      className={(items?.length ?? 0) >= 10 ? 'h-80' : ''}
    >
      {items
        ?.slice(0, lastItemIdx)
        .map((item) => (
          <UtxoItem key={item.utxoId} item={item} assetId={assetId} />
        )) ?? null}
    </ScrollArea>
  );
}

export function Utxos({ items, assetId, ...props }: UtxosProps) {
  return (
    <Collapsible.Content {...props}>
      <Collapsible.Title leftIcon={IconCoins} iconColor="text-icon">
        UTXOs ({items?.length ?? 0})
      </Collapsible.Title>
      <Collapsible.Body className="p-0">
        <CommonList items={items} assetId={assetId} />
      </Collapsible.Body>
    </Collapsible.Content>
  );
}

const styles = tv({
  slots: {
    item: [
      'flex flex-col odd:bg-gray-4 p-2 px-4 gap-2',
      'tablet:flex-row',
      'last:rounded-b-sm',
      'fuel-[Address]:text-[0.8rem] fuel-[Address]:leading-none',
    ],
  },
});
