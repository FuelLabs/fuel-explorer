import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { ContractAsset } from '~/systems/Contract/screens/ContractAsset';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { ContractMintedAssets } from '~/systems/Contract/screens/ContractMintedAsset';
import { ContractTransactions } from '~/systems/Contract/screens/ContractTransactions';

export default function ContractPage() {
  const { t } = useTranslation();
  const { id, tab } = useParams<{ id: string; tab?: string }>();

  // Redirect if no contract ID
  if (!id) {
    return <Navigate to="/" replace />;
  }

  // Handle different tabs
  switch (tab) {
    case 'assets':
      return (
        <>
          <Helmet>
            <title>{t('meta.contract_assets', { id })}</title>
          </Helmet>
          <div className="fuel-appear">
            <ContractAsset id={id} />
          </div>
        </>
      );
    case 'minted-assets':
      return (
        <>
          <Helmet>
            <title>{t('meta.contract_minted_assets', { id })}</title>
          </Helmet>
          <div className="fuel-appear">
            <ContractMintedAssets id={id} />
          </div>
        </>
      );
    case 'transactions':
      return (
        <>
          <Helmet>
            <title>{t('meta.contract_transactions', { id })}</title>
          </Helmet>
          <div className="fuel-appear">
            <ContractTransactions id={id} />
          </div>
        </>
      );
    case 'code':
      return (
        <>
          <Helmet>
            <title>{t('meta.contract_code', { id })}</title>
          </Helmet>
          <div className="fuel-appear">
            <ContractCode id={id} />
          </div>
        </>
      );
    default:
      // Redirect to assets tab by default
      return <Navigate to={`/contract/${id}/assets`} replace />;
  }
}
