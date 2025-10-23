import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { ContractAsset } from '~/systems/Contract/screens/ContractAsset';
import { ContractCode } from '~/systems/Contract/screens/ContractCode';
import { ContractMintedAssets } from '~/systems/Contract/screens/ContractMintedAsset';
import { ContractTransactions } from '~/systems/Contract/screens/ContractTransactions';

export default function ContractPage() {
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
            <title>Contract Assets {id} - Fuel Explorer</title>
          </Helmet>
          <div>
            <ContractAsset id={id} />
          </div>
        </>
      );
    case 'minted-assets':
      return (
        <>
          <Helmet>
            <title>Contract Minted Assets {id} - Fuel Explorer</title>
          </Helmet>
          <div>
            <ContractMintedAssets id={id} />
          </div>
        </>
      );
    case 'transactions':
      return (
        <>
          <Helmet>
            <title>Contract Transactions {id} - Fuel Explorer</title>
          </Helmet>
          <div>
            <ContractTransactions id={id} />
          </div>
        </>
      );
    case 'code':
      return (
        <>
          <Helmet>
            <title>Contract Code {id} - Fuel Explorer</title>
          </Helmet>
          <div>
            <ContractCode id={id} />
          </div>
        </>
      );
    default:
      // Redirect to assets tab by default
      return <Navigate to={`/contract/${id}/assets`} replace />;
  }
}
