import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import { createComponent, Text, VStack, Address, Collapsible } from '@fuels/ui';
import { bn } from 'fuels';
import Image from 'next/image';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';

import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

const ICON_SIZE = 36;

type BalanceItemProps = BaseProps<{
  item: AccountBalanceFragment;
}>;

export const BalanceItem = createComponent<
  BalanceItemProps,
  typeof Collapsible
>({
  id: 'BalanceItem',
  render: (_, { item, ...props }) => {
    const assetId = item.assetId;
    const amount = item.amount;
    const asset = useAsset(assetId);

    if (!asset) return null;
    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          {asset.icon ? (
            <Image
              src={asset.icon as string}
              width={ICON_SIZE}
              height={ICON_SIZE}
              alt={asset.name}
            />
          ) : (
            <TxIcon type="Mint" status="Submitted" />
          )}
          <VStack gap="1" className="flex-1">
            <Text className="text-md font-medium">
              {asset.name}
              {asset.symbol && (
                <Text className="ml-2 text-muted text-sm">
                  ({asset.symbol})
                </Text>
              )}
            </Text>
            <Address value={item.assetId} prefix="Id:" fixed="b256" />
          </VStack>
          {amount && (
            <Text className="text-secondary">
              {bn(amount).format()} {asset.symbol}
            </Text>
          )}
        </Collapsible.Header>
        <Utxos items={item.utxos as UtxoItem[]} assetId={assetId} />
      </Collapsible>
    );
  },
});
