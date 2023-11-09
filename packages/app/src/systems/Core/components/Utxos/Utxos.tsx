import type { UtxoItem as TUtxoItem } from '@fuel-explorer/graphql';
import { Text, HStack, Address, Icon, Collapsible } from '@fuels/ui';
import type { BoxProps } from '@fuels/ui';
import {
  IconCoins,
  IconExternalLink,
  IconSquareKey,
} from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { useMedia } from 'react-use';
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
  const isMobile = useMedia('(max-width: 428px)');

  if (!item.utxoId) return null;

  const asset = useAsset(assetId);
  const classes = styles();
  return (
    <HStack style={style} align="center" gap="4" className={classes.item()}>
      <Address
        prefix="ID:"
        value={item.utxoId}
        className="flex-1"
        addressOpts={
          isMobile
            ? { trimLeft: 7, trimRight: 7 }
            : { trimLeft: 14, trimRight: 14 }
        }
      >
        <Address.Link as={NextLink} href={`/tx/${item.utxoId.slice(0, -2)}`}>
          Transaction <Icon icon={IconExternalLink} size={14} />
        </Address.Link>
      </Address>
      <Text className="text-secondary flex items-center gap-2">
        <Icon icon={IconCoins} size={14} />{' '}
        {bn(item.amount).format({ precision: isMobile ? 3 : undefined })}{' '}
        {asset?.symbol ?? ''}
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

export function Utxos({ items, assetId, ...props }: UtxosProps) {
  const len = items?.length ?? 0;
  return (
    <Collapsible.Content {...props}>
      <Collapsible.Title leftIcon={IconSquareKey} iconColor="text-icon">
        UTXOs ({items?.length ?? 0})
      </Collapsible.Title>
      <Collapsible.Body className="p-0">
        {len > 10 ? (
          <VirtualList items={items} assetId={assetId} />
        ) : (
          <CommonList items={items} assetId={assetId} />
        )}
      </Collapsible.Body>
    </Collapsible.Content>
  );
}

const styles = tv({
  slots: {
    item: [
      'odd:bg-gray-4 p-2 px-4 [&_*]:text-xs h-[35px]',
      'last:rounded-b-sm',
    ],
  },
});
