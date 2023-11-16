import { VStack } from '@fuels/ui';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';
import { EmptyAssets } from '~/systems/Core/components/EmptyBlocks/EmptyAsset';

import { getBalances } from '../actions/get-balances';

type AccountScreenProps = {
  id: string;
};

export async function AccountBalances({ id }: AccountScreenProps) {
  const balances = await getBalances({ owner: id });
  if (!balances?.length) {
    return <EmptyAssets entity="assets" />;
  }

  return (
    <VStack className="min-h-[45vh]">
      {balances?.map((balance) => {
        return (
          <BalanceItem key={balance.assetId + balance.owner} item={balance} />
        );
      })}
    </VStack>
  );
}
