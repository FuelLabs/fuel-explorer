import type { BaseProps } from '@fuels/ui';
import {
  Address,
  Box,
  Collapsible,
  Flex,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Text,
} from '@fuels/ui';
import { bn } from 'fuels';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';

import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { Amount } from '../Amount/Amount';

import type { UtxoItemType } from '~/systems/Core/components/Utxos/types';
import { Utxos } from '../Utxos/Utxos';

type BalanceItemProps = BaseProps<{
  item: Omit<GQLBalanceItemFragment, 'owner' | '__typename'>;
  isLoading?: boolean;
}>;

export function BalanceItem({ item, isLoading, ...props }: BalanceItemProps) {
  const assetId = item.assetId;
  const amount = item.amount;
  const hasUTXOs = !!item.utxos?.length;
  const asset = item;

  return (
    <Collapsible {...props} hideIcon={!hasUTXOs} className={'min-h-16'}>
      <Collapsible.Header>
        <Flex className="flex-1 flex-col tablet:flex-row tablet:justify-between tablet:items-center">
          <AssetItem assetId={assetId} isLoading={isLoading} asset={asset}>
            <Address value={item.assetId} prefix="Id:" isLoading={isLoading} />
          </AssetItem>
          <Box className="ml-14 mt-2 tablet:ml-0 tablet:mt-0">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={
                <HStack align="center" gap="2">
                  <LoadingBox className="w-20 h-5" />
                  <LoadingBox className="w-16 h-4" />
                </HStack>
              }
              regularEl={
                <HStack align="center">
                  {amount && (
                    <Amount
                      className="text-primary text-base"
                      hideIcon
                      hideSymbol
                      assetId={assetId}
                      value={bn(amount)}
                      decimals={asset.decimals || undefined}
                    />
                  )}
                  {asset.amountInUsd && (
                    <Text className="text-secondary" as="div" size="2">
                      ({asset.amountInUsd})
                    </Text>
                  )}
                </HStack>
              }
            />
          </Box>
        </Flex>
      </Collapsible.Header>
      {hasUTXOs && (
        <Utxos
          items={item.utxos as Array<UtxoItemType>}
          assetId={assetId}
          decimals={asset.decimals}
        />
      )}
    </Collapsible>
  );
}
