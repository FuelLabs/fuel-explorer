'use client';
import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import type { BaseProps } from '@fuels/ui';
import {
  Text,
  Address,
  Collapsible,
  Flex,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import { bn } from 'fuels';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';

import { formatZeroUnits } from '../../utils/format';
import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

type BalanceItemProps = BaseProps<{
  item: Omit<AccountBalanceFragment, 'owner' | '__typename'>;
  isLoading?: boolean;
}>;

export function BalanceItem({ item, isLoading, ...props }: BalanceItemProps) {
  const assetId = item.assetId;
  const amount = item.amount;
  const asset = useAsset(assetId);
  const fuelAsset = useFuelAsset(asset);
  if (!asset) return null;

  const hasUTXOs = !!item.utxos?.length;

  return (
    <Collapsible {...props} hideIcon={!hasUTXOs}>
      <Collapsible.Header>
        <Flex className="flex-1 flex-col tablet:flex-row tablet:justify-between tablet:items-center">
          <AssetItem assetId={assetId} isLoading={isLoading}>
            <Address value={item.assetId} prefix="Id:" fixed="b256" />
          </AssetItem>
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-24 h-6" />}
            regularEl={
              amount && (
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
              )
            }
          />
        </Flex>
      </Collapsible.Header>
      {hasUTXOs && <Utxos items={item.utxos as UtxoItem[]} assetId={assetId} />}
    </Collapsible>
  );
}
