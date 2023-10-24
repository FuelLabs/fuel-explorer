import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import {
  createComponent,
  Text,
  Card,
  cx,
  HStack,
  IconButton,
  VStack,
  Address,
} from '@fuels/ui';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { bn } from 'fuels';
import Image from 'next/image';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';

import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

const ICON_SIZE = 36;

type BalanceItemProps = BaseProps<{
  item: AccountBalanceFragment;
}>;

export const BalanceItem = createComponent<BalanceItemProps, typeof Card>({
  id: 'BalanceItem',
  render: (_, { item, ...props }) => {
    const [opened, setOpened] = useState(false);
    const classes = styles();
    const assetId = item.assetId;
    const amount = item.amount;
    const asset = useAsset(assetId);

    if (!asset) return null;
    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header
          className={classes.header()}
          data-state={opened ? 'opened' : 'closed'}
        >
          <HStack align="center">
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
            <VStack gap="1">
              <Text className="text-md font-medium">
                {asset.name}
                {asset.symbol && (
                  <Text className="ml-2 text-muted text-sm">
                    ({asset.symbol})
                  </Text>
                )}
              </Text>
              <Address value={item.assetId} prefix="Id:" />
            </VStack>
          </HStack>
          <HStack align="center">
            {amount && (
              <Text className="text-secondary">
                {bn(amount).format()} {asset.symbol}
              </Text>
            )}
            <IconButton
              iconColor="text-muted"
              variant="link"
              className={classes.icon()}
              icon={opened ? IconChevronUp : IconChevronDown}
              onClick={() => setOpened(!opened)}
            />
          </HStack>
        </Card.Header>
        {opened && (item.utxos?.length ?? 0 > 0) && (
          <Utxos items={item.utxos as UtxoItem[]} assetId={assetId} />
        )}
      </Card>
    );
  },
});

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'mx-4 bg-gray-3 p-3 rounded',
  },
});
