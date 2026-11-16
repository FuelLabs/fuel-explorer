import type {
  GQLContractBalanceConnectionNodeFragment,
  Maybe,
} from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';
import { BalanceList } from '~/systems/Core/components/BalanceItem/BalanceList';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { ContractBalanceItem } from './ContractBalanceItem';

type TabAssetsProps = {
  balances?: Maybe<GQLContractBalanceConnectionNodeFragment['edges']>;
  isLoading?: boolean;
};

export function ContractAssetList({ balances, isLoading }: TabAssetsProps) {
  const { t } = useTranslation();
  const nonZeroBalances = balances?.filter(
    (contractBalance) => !bn(contractBalance.node.amount).isZero(),
  );
  return (
    <VStack gap="4" className="mt-0 tablet:mt-6">
      {!nonZeroBalances?.length && (
        <EmptyCard>
          <EmptyCard.Title>{t('contract.no_assets_title')}</EmptyCard.Title>
          <EmptyCard.Description>
            {t('contract.no_assets_body')}
          </EmptyCard.Description>
        </EmptyCard>
      )}
      {!!nonZeroBalances?.length && (
        <BalanceList>
          {nonZeroBalances.map((contractBalance) => {
            if (bn(contractBalance.node.amount).isZero()) return null;

            return (
              <ContractBalanceItem
                key={
                  contractBalance.cursor + JSON.stringify(contractBalance.node)
                }
                balanceItem={contractBalance.node}
                isLoading={isLoading}
              />
            );
          })}
        </BalanceList>
      )}
    </VStack>
  );
}
