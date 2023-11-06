import type {
  ContractBalanceConnectionItemFragment,
  Maybe,
} from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { bn } from 'fuels';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

type TabAssetsProps = {
  contractBalances?: Maybe<ContractBalanceConnectionItemFragment>;
};

export function TabAssets({ contractBalances }: TabAssetsProps) {
  const nonZeroBalances = contractBalances?.edges.filter(
    (contractBalance) => !bn(contractBalance.node.amount).isZero(),
  );

  return (
    <VStack gap="4" className="mt-1">
      {!nonZeroBalances?.length && (
        <EmptyCard hideImage>
          <EmptyCard.Title>No Assets</EmptyCard.Title>
          <EmptyCard.Description>
            This contract does not have any assets.
          </EmptyCard.Description>
        </EmptyCard>
      )}
      {nonZeroBalances?.map((contractBalance) => {
        if (bn(contractBalance.node.amount).isZero()) return null;

        return (
          <ContractBalanceItem
            key={contractBalance.cursor + JSON.stringify(contractBalance.node)}
            {...contractBalance.node}
          />
        );
      })}
    </VStack>
  );
}

type ContractBalanceItemProps = {
  amount: string;
  assetId: string;
};

export function ContractBalanceItem({
  amount,
  assetId,
}: ContractBalanceItemProps) {
  const balanceItem = {
    assetId,
    amount,
  };

  return (
    <BalanceItem
      key={balanceItem.assetId + balanceItem.amount}
      item={balanceItem}
    />
  );
}
