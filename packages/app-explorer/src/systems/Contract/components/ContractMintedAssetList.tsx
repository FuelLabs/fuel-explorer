import type { GQLAssetsByContractQuery, Maybe } from '@fuel-explorer/graphql';
import { VStack } from '@fuels/ui';

import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routes';
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
          <EmptyCard.Title>No Minted Assets</EmptyCard.Title>
          <EmptyCard.Description>
            This contract does not have any minted assets.
          </EmptyCard.Description>
        </EmptyCard>
      )}
      {mintedAssets?.nodes.map((mintedAsset) => {
        if (!mintedAsset.assetId) return null;
        return (
          <ContractMintedAssetItem
            key={mintedAsset.assetId}
            mintedAsset={mintedAsset}
            isLoading={isLoading}
          />
        );
      })}
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
