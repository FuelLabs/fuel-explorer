import { useTranslation } from 'react-i18next';
import { useAccountBalances } from '~/hooks/useApi';
import { PageState } from '~/systems/Core/components/PageState/PageState';
import { TxDim } from '~/systems/Transaction/component/TxNotice/TxNotice';
import { AccountNfts } from '../components/AccountNfts/AccountNfts';
import { AccountNftsLoader } from '../components/AccountNfts/AccountNftsLoader';

type AccountNftsProps = {
  id: string;
};

export function AccountNftsSync({ id }: AccountNftsProps) {
  const { t } = useTranslation();
  const {
    data: balances,
    isLoading,
    isFetching,
    error,
  } = useAccountBalances(id);

  // The loader shows on the first load only. A refetch keeps the grid and dims it.
  if (isLoading) {
    return <AccountNftsLoader />;
  }

  if (error) {
    return (
      <PageState
        tone="error"
        title={t('account.error_nfts')}
        description={error.message}
      />
    );
  }

  return (
    <TxDim busy={isFetching}>
      <AccountNfts balances={balances || []} />
    </TxDim>
  );
}
