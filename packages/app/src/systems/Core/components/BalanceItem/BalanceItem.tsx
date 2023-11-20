'use client';
import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps, CardProps } from '@fuels/ui';
import {
  createComponent,
  Text,
  VStack,
  Address,
  Collapsible,
  Flex,
  withNamespace,
  Card,
} from '@fuels/ui';
import { bn } from 'fuels';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';

import { formatZeroUnits } from '../../utils/format';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

type BalanceItemProps = BaseProps<{
  item: Omit<AccountBalanceFragment, 'owner' | '__typename'>;
}>;

const BalanceItemRoot = createComponent<BalanceItemProps, typeof Collapsible>({
  id: 'BalanceItem',
  render: (_, { item, ...props }) => {
    const assetId = item.assetId;
    const amount = item.amount;
    const asset = useAsset(assetId);
    const fuelAsset = useFuelAsset(asset);
    if (!asset) return null;

    const hasUTXOs = !!item.utxos?.length;

    return (
      <Collapsible {...props}>
        <Collapsible.Header hideIcon={!hasUTXOs}>
          <Flex className="flex-1 flex-col tablet:flex-row tablet:justify-between tablet:items-center">
            <AssetItem assetId={assetId}>
              <Address value={item.assetId} prefix="Id:" fixed="b256" />
            </AssetItem>
            {amount && (
              <Text className="text-secondary">
                {fuelAsset?.decimals ? (
                  <>
                    {bn(amount).format({
                      precision: fuelAsset.decimals,
                      units: fuelAsset.decimals,
                    })}{' '}
                    {asset.symbol}
                  </>
                ) : (
                  formatZeroUnits(amount)
                )}
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
