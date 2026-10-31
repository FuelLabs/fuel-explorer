import type { GQLAssetsByContractQuery, Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routes';
import { BalanceList } from '~/systems/Core/components/BalanceItem/BalanceList';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { Pagination } from '~/systems/Core/components/Pagination/Pagination';
import { ContractMintedAssetItem } from './ContractMintedAssetItem';

type TabMintedAssetsProps = {
  contractId: string;
  mintedAssets?: Maybe<GQLAssetsByContractQuery['assetsByContract']>;
  isLoading?: boolean;
};

export function ContractMintedAssetList({
  contractId,
  mintedAssets,
  isLoading,
}: TabMintedAssetsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function buildRoute(
    contractId: string,
    cursor: string,
    dir: 'after' | 'before',
  ) {
    navigate(
      Routes.contractMintedAssetsWithPagination(contractId, cursor, dir),
    );
  }
  return (
    <VStack gap="4" className="mt-0 tablet:mt-6">
      {!mintedAssets?.nodes.length && (
        <EmptyCard>
          <EmptyCard.Title>{t('contract.no_minted_title')}</EmptyCard.Title>
          <EmptyCard.Description>
            {t('contract.no_minted_body')}
          </EmptyCard.Description>
        </EmptyCard>
      )}
      {!!mintedAssets?.nodes.length && (
        <BalanceList>
          {mintedAssets.nodes.map((mintedAsset) => {
            if (!mintedAsset.assetId) return null;
            return (
              <ContractMintedAssetItem
                key={mintedAsset.assetId}
                mintedAsset={mintedAsset}
                isLoading={isLoading}
              />
            );
          })}
        </BalanceList>
      )}
      <Pagination
        prevCursor={mintedAssets?.pageInfo?.startCursor}
        nextCursor={mintedAssets?.pageInfo?.endCursor}
        className="mt-6 flex justify-end"
        onChange={(cursor, dir) => buildRoute(contractId, cursor, dir)}
        pageInfo={mintedAssets?.pageInfo}
      />
    </VStack>
  );
}
