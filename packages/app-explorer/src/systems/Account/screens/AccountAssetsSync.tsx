import { useTranslation } from 'react-i18next';
import { useAccountBalances } from '~/hooks/useApi';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { TxDim } from '~/systems/Transaction/component/TxNotice/TxNotice';
import { AccountAssets } from '../components/AccountAssets/AccountAssets';
import { AccountAssetsLoader } from '../components/AccountAssets/AccountAssetsLoader';

type AccountAssetsProps = {
  id: string;
};

export function AccountAssetsSync({ id }: AccountAssetsProps) {
  const { t } = useTranslation();
  const {
    data: balances,
    isLoading,
    isFetching,
    error,
  } = useAccountBalances(id);

  // The loader shows on the first load only. A refetch keeps the rows and dims them.
  if (isLoading) {
    return <AccountAssetsLoader />;
  }

  if (error) {
    return (
      <PageState
        tone="error"
        title={t('account.error_balances')}
        description={error.message}
      />
    );
  }

  return (
    <TxDim busy={isFetching}>
      <AccountAssets balances={balances || []} id={id} />
    </TxDim>
  );
}
