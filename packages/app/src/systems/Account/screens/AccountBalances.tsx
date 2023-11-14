'use client';

import type { AccountBalanceFragment, Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

type AccountScreenProps = {
  balances?: Maybe<AccountBalanceFragment[]>;
};

export function AccountBalances({ balances }: AccountScreenProps) {
  if (!balances?.length) {
    return (
      <EmptyCard>
        <EmptyCard.Title>No Assets</EmptyCard.Title>
        <EmptyCard.Description>
          This account does not have any asset.
        </EmptyCard.Description>
      </EmptyCard>
    );
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
