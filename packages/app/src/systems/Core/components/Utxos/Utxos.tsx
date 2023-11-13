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
import { IconCoins, IconSquareKey } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { VariableSizeList as List } from 'react-window';
import { tv } from 'tailwind-variants';

export type UtxoItem = Partial<Omit<TUtxoItem, '__typename'>>;

type UtxoItemProps = {
  item: UtxoItem;
  style?: React.CSSProperties;
};

function UtxoItem({ item, style }: UtxoItemProps) {
  const { isMobile } = useBreakpoints();

  if (!item.utxoId) return null;
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
      <Text className="text-secondary flex items-center gap-2">
        <Icon icon={IconCoins} size={14} />{' '}
        {bn(item.amount).format({ precision: isMobile ? 3 : undefined })}{' '}
      </Text>
    </Box>
  );
}

type UtxosProps = BoxProps & {
  assetId?: string;
  items?: UtxoItem[] | null;
};

function VirtualList({ items }: UtxosProps) {
  const { isMobile } = useBreakpoints();
  return (
    <List
      height={350}
      itemCount={items?.length ?? 0}
      width="100%"
      itemSize={() => (isMobile ? 85 : 35)}
    >
      {({ index: idx, style }) => {
        const item = items?.[idx];
        return item && <UtxoItem key={item.utxoId} style={style} item={item} />;
      }}
    </List>
  );
}

function CommonList({ items }: UtxosProps) {
  return (
    items?.map((item) => <UtxoItem key={item.utxoId} item={item} />) ?? null
  );
}

export function Utxos({ items, ...props }: UtxosProps) {
  const len = items?.length ?? 0;
  return (
    <Collapsible.Content {...props}>
      <Collapsible.Title leftIcon={IconSquareKey} iconColor="text-icon">
        UTXOs ({items?.length ?? 0})
      </Collapsible.Title>
      <Collapsible.Body className="p-0">
        {len > 10 ? (
          <VirtualList items={items} />
        ) : (
          <CommonList items={items} />
        )}
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
