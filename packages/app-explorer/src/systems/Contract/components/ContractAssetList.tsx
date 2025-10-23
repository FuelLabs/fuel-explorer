import type {
  GQLContractBalanceConnectionNodeFragment,
  Maybe,
} from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { bn } from 'fuels';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { ContractBalanceItem } from './ContractBalanceItem';

type TabAssetsProps = {
  balances?: Maybe<GQLContractBalanceConnectionNodeFragment['edges']>;
  isLoading?: boolean;
};

export function ContractAssetList({ balances, isLoading }: TabAssetsProps) {
  const nonZeroBalances = balances?.filter(
    (contractBalance) => !bn(contractBalance.node.amount).isZero(),
  );
  return (
    <VStack gap="4" className="mt-0 tablet:mt-6">
      {!nonZeroBalances?.length && (
        <EmptyCard>
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
            balanceItem={contractBalance.node}
            isLoading={isLoading}
          />
        );
      })}
    </VStack>
  );
}
