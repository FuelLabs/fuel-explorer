import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps, CardProps } from '@fuels/ui';
import {
  createComponent,
  Text,
  VStack,
  Address,
  Collapsible,
  useBreakpoints,
  Flex,
  withNamespace,
  Card,
} from '@fuels/ui';
import { bn } from 'fuels';
import Image from 'next/image';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';

import { LoadingBox } from '../LoadingBox/LoadingBox';
import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

const ICON_SIZE = 36;

type BalanceItemProps = BaseProps<{
  item: Omit<AccountBalanceFragment, 'owner' | '__typename'>;
}>;

const BalanceItemRoot = createComponent<BalanceItemProps, typeof Collapsible>({
  id: 'BalanceItem',
  render: (_, { item, ...props }) => {
    const assetId = item.assetId;
    const amount = item.amount;
    const asset = useAsset(assetId);
    const { isMobile } = useBreakpoints();
    if (!asset) return null;

    const hasUTXOs = !!item.utxos?.length;

    return (
      <Collapsible {...props}>
        <Collapsible.Header hideIcon={!hasUTXOs}>
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
          <Flex className="flex-1 flex-col tablet:flex-row tablet:justify-between tablet:items-center">
            <VStack gap="1">
              <Text className="text-md font-medium">
                {asset.name}
                {!isMobile && asset.symbol && (
                  <Text className="ml-2 text-muted text-sm">
                    ({asset.symbol})
                  </Text>
                )}
              </Text>
              {!isMobile && (
                <Address value={item.assetId} prefix="Id:" fixed="b256" />
              )}
            </VStack>
            {amount && (
              <Text className="text-secondary">
                {bn(amount).format()} {asset.symbol}
              </Text>
            )}
          </Flex>
        </Collapsible.Header>
        {hasUTXOs && (
          <Utxos items={item.utxos as UtxoItem[]} assetId={assetId} />
        )}
      </Collapsible>
    );
  },
});

const BalanceItemSkeleton = createComponent<
  Omit<CardProps, 'children'>,
  typeof Card
>({
  id: 'BalanceItemLoader',
  render: (_, props) => {
    return (
      <Card {...props} className="gap-0 py-0">
        <Card.Header className="grid grid-cols-[auto_1fr_2fr_1fr] gap-6 h-[73px] py-3">
          <LoadingBox className="w-12 -full" />
          <VStack gap="2" justify="center">
            <LoadingBox className="h-4 w-full" />
            <LoadingBox className="h-4 w-full" />
          </VStack>
          <div />
          <VStack gap="2" justify="center">
            <LoadingBox className="h-4 w-full" />
          </VStack>
        </Card.Header>
      </Card>
    );
  },
});

export const BalanceItem = withNamespace(BalanceItemRoot, {
  Skeleton: BalanceItemSkeleton,
});
