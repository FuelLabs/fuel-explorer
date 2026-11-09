import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useContractMintedAssets } from '~/hooks/useApi';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { TxDim } from '~/systems/Transaction/component/TxNotice/TxNotice';
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
  const { t } = useTranslation();
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

  if (isLoading) {
    return <ContractMintedAssetsLoader />;
  }

  if (error) {
    return <PageState tone="error" title={t('contract.error_minted')} />;
  }

  return (
    <TxDim busy={isFetching}>
      <ContractMintedAssetList contractId={id} mintedAssets={mintedAssets} />
    </TxDim>
  );
}
