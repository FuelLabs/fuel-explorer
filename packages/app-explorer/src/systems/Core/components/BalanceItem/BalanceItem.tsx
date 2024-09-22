'use client';
import type { BaseProps } from '@fuels/ui';
import {
  Address,
  Box,
  Collapsible,
  Flex,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import { bn } from 'fuels';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';

import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { Amount } from '../Amount/Amount';

import { UtxoItemType } from '~/systems/Core/components/Utxos/types';
import { Utxos } from '../Utxos/Utxos';

type BalanceItemProps = BaseProps<{
  item: Omit<GQLBalanceItemFragment, 'owner' | '__typename'>;
  isLoading?: boolean;
}>;

export function BalanceItem({ item, isLoading, ...props }: BalanceItemProps) {
  const assetId = item.assetId;
  const amount = item.amount;
  const hasUTXOs = !!item.utxos?.length;

  return (
    <Collapsible {...props} hideIcon={!hasUTXOs}>
      <Collapsible.Header>
        <Flex className="flex-1 flex-col tablet:flex-row tablet:justify-between tablet:items-center">
          <AssetItem assetId={assetId} isLoading={isLoading}>
            <Address
              value={item.assetId}
              prefix="Id:"
              fixed="b256"
              isLoading={isLoading}
            />
          </AssetItem>
          <Box className="ml-14 mt-2 tablet:ml-0 tablet:mt-0">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-30 h-5" />}
              regularEl={
                amount && (
                  <Amount
                    hideIcon
                    hideSymbol
                    assetId={assetId}
                    value={bn(amount)}
                  />
                )
              }
            />
          </Box>
        </Flex>
      </Collapsible.Header>
      {hasUTXOs && (
        <Utxos items={item.utxos as Array<UtxoItemType>} assetId={assetId} />
      )}
    </Collapsible>
  );
}
