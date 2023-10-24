import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import {
  createComponent,
  Text,
  Card,
  cx,
  HStack,
  Copyable,
  IconButton,
  VStack,
  Link,
  ScrollArea,
  Icon,
} from '@fuels/ui';
import {
  IconChevronUp,
  IconChevronDown,
  IconExternalLink,
} from '@tabler/icons-react';
import { bn } from 'fuels';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { Address } from '~/systems/Core/components/Address/Address';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';

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
              <Address id={item.assetId} label="Id" />
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
        {opened && (
          <Card.Body className={classes.utxos()}>
            <Text as="div" className="text-xs border-b pb-1 border-border mb-2">
              UTXOs ({item.utxos?.length ?? 0})
            </Text>
            <ScrollArea
              className={cx({ 'pr-4': item.utxos?.length ?? 0 > 9 })}
              scrollbars="vertical"
              style={{ maxHeight: 300 }}
              type="auto"
            >
              {item.utxos?.map(
                (item) =>
                  item && (
                    <HStack
                      key={item.utxoId}
                      align="center"
                      className="odd:bg-gray-4 p-2 px-3"
                    >
                      <Copyable
                        className="text-xs flex-1"
                        value={item.utxoId}
                        iconSize={14}
                      >
                        ID:{' '}
                        <Text as="span" className="text-muted text-xs">
                          {item.utxoId}
                        </Text>
                      </Copyable>
                      <Text className="text-xs text-muted">
                        {bn(item.amount).format()} {asset.symbol ?? ''}
                      </Text>
                      <Link asChild className="text-xs">
                        <NextLink href={`/tx/${item.txCreatedIdx}`}>
                          View Transaction{' '}
                          <Icon
                            icon={IconExternalLink}
                            size={14}
                            className="ml-1"
                          />
                        </NextLink>
                      </Link>
                    </HStack>
                  ),
              )}
            </ScrollArea>
          </Card.Body>
        )}
      </Card>
    );
  },
});

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-3 mx-4 p-3 rounded',
  },
});
