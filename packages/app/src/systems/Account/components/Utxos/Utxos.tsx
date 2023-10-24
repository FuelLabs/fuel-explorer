import type { UtxoItem as TUtxoItem } from '@fuel-explorer/graphql';
import { Copyable, Text, HStack, ScrollArea, cx, Box } from '@fuels/ui';
import type { BoxProps } from '@fuels/ui';
import { IconSquareKey } from '@tabler/icons-react';
import { bn } from 'fuels';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';

export type UtxoItem = Omit<TUtxoItem, '__typename'>;

type UtxosProps = BoxProps & {
  assetId: string;
  items?: Partial<Omit<UtxoItem, '__typename'>>[] | null;
};

export function Utxos({ items, assetId, className, ...props }: UtxosProps) {
  const asset = useAsset(assetId);
  const classes = styles();
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
      <ScrollArea
        className={cx({ 'pr-4': items?.length ?? 0 > 9 })}
        scrollbars="vertical"
        style={{ maxHeight: 300 }}
        type="auto"
      >
        {items?.map((item) => {
          return (
            item && (
              <HStack
                key={item.utxoId}
                align="center"
                className="odd:bg-gray-4 p-2 px-2 [&_*]:text-xs"
                gap="4"
              >
                <Copyable className="flex-1" value={item.utxoId!} iconSize={14}>
                  ID:{' '}
                  <Text as="span" className="text-muted">
                    {item.utxoId}
                  </Text>
                </Copyable>
                <Text className="text-muted">
                  {bn(item.amount).format()} {asset?.symbol ?? ''}
                </Text>
              </HStack>
            )
          );
        })}
      </ScrollArea>
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
