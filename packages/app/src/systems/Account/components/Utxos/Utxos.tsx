import type { UtxoItem as TUtxoItem } from '@fuel-explorer/graphql';
import { Text, HStack, cx, Box, Address } from '@fuels/ui';
import type { BoxProps } from '@fuels/ui';
import { IconSquareKey } from '@tabler/icons-react';
import { bn } from 'fuels';
import { FixedSizeList as List } from 'react-window';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';

export type UtxoItem = Partial<Omit<TUtxoItem, '__typename'>>;

type UtxoItemProps = {
  item: UtxoItem;
  assetId: string;
  style?: React.CSSProperties;
};

function UtxoItem({ item, assetId, style }: UtxoItemProps) {
  const asset = useAsset(assetId);
  return (
    <HStack
      style={style}
      align="center"
      gap="4"
      className={cx('odd:bg-gray-4 p-2 px-2', '[&_*]:text-xs', 'max-h-[35px]')}
    >
      <Address full prefix="ID:" value={item.utxoId} className="flex-1" />
      <Text className="text-muted">
        {bn(item.amount).format()} {asset?.symbol ?? ''}
      </Text>
    </HStack>
  );
}

type UtxosProps = BoxProps & {
  assetId: string;
  items?: UtxoItem[] | null;
};

function VirtualList({ items, assetId }: UtxosProps) {
  return (
    <List
      height={350}
      itemCount={items?.length ?? 0}
      itemSize={35}
      width="100%"
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
            />
          )
        );
      }}
    </List>
  );
}

function CommonList({ items, assetId }: UtxosProps) {
  return (
    items?.map((item) => (
      <UtxoItem key={item.utxoId} item={item} assetId={assetId} />
    )) ?? null
  );
}

export function Utxos({ items, assetId, className, ...props }: UtxosProps) {
  const classes = styles();
  const len = items?.length ?? 0;
  return (
    <Box {...props} className={classes.root({ className })}>
      <Text
        as="div"
        className={classes.title()}
        leftIcon={IconSquareKey}
        iconColor="text-icon"
      >
        UTXOs ({items?.length ?? 0})
      </Text>
      {len > 10 ? (
        <VirtualList items={items} assetId={assetId} />
      ) : (
        <CommonList items={items} assetId={assetId} />
      )}
    </Box>
  );
}

const styles = tv({
  slots: {
    root: 'bg-gray-3 mx-4 py-3 px-4 rounded',
    title: [
      'flex items-center',
      'text-sm font-medium text-secondary',
      'border-b py-1 border-border mb-3',
    ],
  },
});
