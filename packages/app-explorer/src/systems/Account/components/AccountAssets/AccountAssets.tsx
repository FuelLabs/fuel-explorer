import type { GQLBalanceFragment } from '@fuel-explorer/graphql-new';
import { VStack } from '@fuels/ui';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';
import { EmptyAssets } from '~/systems/Core/components/EmptyBlocks/EmptyAsset';

export type AccountAssetsProps = {
  balances: GQLBalanceFragment[];
  id: string;
  isLoading?: boolean;
};

export function AccountAssets({ balances, isLoading }: AccountAssetsProps) {
  if (!balances?.length) return <EmptyAssets entity="assets" />;

  return (
    <VStack className="min-h-[45vh]">
      {balances?.map((balance) => {
        return (
          <BalanceItem
            key={balance.assetId + balance.owner}
            isLoading={isLoading}
            item={balance}
          />
        );
      })}
    </VStack>
  );
}
