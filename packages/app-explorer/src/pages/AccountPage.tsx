import { LoadingBox } from '@fuels/ui';
import { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from '~/routes';
import { AccountAssetsLoader } from '~/systems/Account/components/AccountAssets/AccountAssetsLoader';
import { AccountHeader } from '~/systems/Account/components/AccountHeader';
import { AccountNftsLoader } from '~/systems/Account/components/AccountNfts/AccountNftsLoader';
import { AccountAssetsSync } from '~/systems/Account/screens/AccountAssetsSync';
import { AccountNftsSync } from '~/systems/Account/screens/AccountNftsSync';
import { AccountPredicateSync } from '~/systems/Account/screens/AccountPredicateSync';
import { AccountTransactionsSync } from '~/systems/Account/screens/AccountTransactionsSync';

const _REVALIDATE_INTERVAL = 10;

export function AccountPage() {
  const { t } = useTranslation();
  const { id, tab } = useParams<{ id: string; tab?: string }>();
  const navigate = useNavigate();

  // Redirect if no account ID
  if (!id) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!id?.startsWith('0x')) {
      const prefixed = `0x${id}`;
      const route =
        tab === 'transactions'
          ? Routes.accountTxs
          : tab === 'predicate'
            ? Routes.accountPredicate
            : Routes.accountAssets;
      navigate(route(prefixed), { replace: true });
    }
  }, [id, tab, navigate]);

  // Handle different tabs
  switch (tab) {
    case 'assets':
      return (
        <>
          <Helmet>
            <title>{t('meta.account_assets', { id })}</title>
          </Helmet>
          <AccountHeader />
          <Suspense fallback={<AccountAssetsLoader />}>
            <AccountAssetsSync id={id} />
          </Suspense>
        </>
      );
    case 'transactions':
      return (
        <>
          <Helmet>
            <title>{t('meta.account_transactions', { id })}</title>
          </Helmet>
          <AccountHeader />
          <Suspense fallback={<AccountTransactionsLoader />}>
            <AccountTransactionsSync id={id} />
          </Suspense>
        </>
      );
    case 'nfts':
      return (
        <>
          <Helmet>
            <title>{t('meta.account_nfts', { id })}</title>
          </Helmet>
          <AccountHeader />
          <Suspense fallback={<AccountNftsLoader />}>
            <AccountNftsSync id={id} />
          </Suspense>
        </>
      );
    case 'predicate':
      return (
        <>
          <Helmet>
            <title>{t('meta.account_predicate', { id })}</title>
          </Helmet>
          <AccountHeader />
          <AccountPredicateSync id={id} />
        </>
      );
    default:
      // Redirect to assets tab by default
      return <Navigate to={`/account/${id}/assets`} replace />;
  }
}

// Placeholder component for transactions loader
function AccountTransactionsLoader() {
  return (
    <div className="flex flex-col gap-4">
      <LoadingBox className="h-8 w-1/4" />
      {[1, 2, 3].map((i) => (
        <LoadingBox key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}
