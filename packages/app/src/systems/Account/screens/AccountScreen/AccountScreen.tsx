'use client';

import type { AccountBalanceFragment, Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';

import { BalanceItem } from '../../components/BalanceItem/BalanceItem';

type AccountScreenProps = {
  balances?: Maybe<AccountBalanceFragment[]>;
};

export function AccountScreen({ balances }: AccountScreenProps) {
  return (
    <VStack>
      {balances?.map((balance) => {
        return (
          <BalanceItem key={balance.assetId + balance.owner} item={balance} />
        );
      })}
    </VStack>
  );
}
