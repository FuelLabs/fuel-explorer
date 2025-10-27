import { useContractBalances } from '~/hooks/useApi';
import { ContractAssetList } from '../components/ContractAssetList';
import { ContractAssetsLoader } from '../components/ContractAssetsLoader';

type ContractAssetProps = {
  id: string;
};

export function ContractAsset({ id }: ContractAssetProps) {
  const {
    data: balances,
    isLoading,
    isFetching,
    error,
  } = useContractBalances(id);

  if (isLoading || isFetching) {
    return <ContractAssetsLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load contract assets</p>
      </div>
    );
  }

  return <ContractAssetList balances={balances || []} />;
}
