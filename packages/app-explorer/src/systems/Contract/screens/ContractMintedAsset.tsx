import { useSearchParams } from 'react-router-dom';
import { useContractMintedAssets } from '~/hooks/useApi';
import { ContractMintedAssetList } from '../components/ContractMintedAssetList';
import { ContractMintedAssetsLoader } from '../components/ContractMintedAssetsLoader';

type ContractMintedAssetProps = {
  id: string;
  cursor?: string | null | undefined;
  dir?: 'after' | 'before';
};

export function ContractMintedAssets({
  id,
  cursor,
  dir = 'after',
}: ContractMintedAssetProps) {
  const [searchParams] = useSearchParams();
  const _cursor = searchParams.get('cursor') ?? cursor;
  const _dir = (searchParams.get('dir') ?? dir) as 'after' | 'before';

  const {
    data: mintedAssets,
    isLoading,
    isFetching,
    error,
  } = useContractMintedAssets(id, {
    cursor: _cursor || undefined,
    direction: _dir,
  });

  if (isLoading || isFetching) {
    return <ContractMintedAssetsLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load minted assets</p>
      </div>
    );
  }

  return (
    <ContractMintedAssetList contractId={id} mintedAssets={mintedAssets} />
  );
}
