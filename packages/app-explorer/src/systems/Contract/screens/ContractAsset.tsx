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
    isPending,
    isFetching,
    error,
  } = useContractBalances(id);

  // isPending, not isLoading: a retry paused in a background tab is pending
  // with no data and no error, and must not render as "No Assets".
  if (isPending) {
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
