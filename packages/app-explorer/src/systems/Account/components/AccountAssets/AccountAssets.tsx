import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';
import { BalanceList } from '~/systems/Core/components/BalanceItem/BalanceList';
import { EmptyAssets } from '~/systems/Core/components/EmptyBlocks/EmptyAsset';
import { isNFT } from '../AccountNfts/groupNFTsByCollection';

export type AccountAssetsProps = {
  balances: GQLBalanceItemFragment[];
  id: string;
  isLoading?: boolean;
};

export function AccountAssets({ balances, isLoading }: AccountAssetsProps) {
  if (!balances?.length) return <EmptyAssets entity="assets" />;

  return (
    <BalanceList>
      {balances
        ?.filter((balance) => !isNFT(balance))
        .map((balance) => {
          return (
            <BalanceItem
              key={balance.assetId + balance.owner}
              isLoading={isLoading}
              item={balance}
            />
          );
        })}
    </BalanceList>
  );
}
