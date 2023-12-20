'use client';
import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import {
  Address,
  Collapsible,
  Flex,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import { bn } from 'fuels';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';

import { Amount } from '../Amount/Amount';
import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

type BalanceItemProps = BaseProps<{
  item: Omit<AccountBalanceFragment, 'owner' | '__typename'>;
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
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-24 h-6" />}
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
        </Flex>
      </Collapsible.Header>
      {hasUTXOs && <Utxos items={item.utxos as UtxoItem[]} assetId={assetId} />}
    </Collapsible>
  );
}
