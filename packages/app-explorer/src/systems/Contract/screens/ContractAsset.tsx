import { useTranslation } from 'react-i18next';
import { useContractBalances } from '~/hooks/useApi';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { TxDim } from '~/systems/Transaction/component/TxNotice/TxNotice';
import { ContractAssetList } from '../components/ContractAssetList';
import { ContractAssetsLoader } from '../components/ContractAssetsLoader';

type ContractAssetProps = {
  id: string;
};

export function ContractAsset({ id }: ContractAssetProps) {
  const { t } = useTranslation();
  const {
    data: balances,
    isLoading,
    isFetching,
    error,
  } = useContractBalances(id);

  if (isLoading) {
    return <ContractAssetsLoader />;
  }

  if (error) {
    return <PageState tone="error" title={t('contract.error_assets')} />;
  }

  return (
    <TxDim busy={isFetching}>
      <ContractAssetList balances={balances || []} />
    </TxDim>
  );
}
