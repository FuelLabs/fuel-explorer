import { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
            <title>Account Assets {id} - Fuel Explorer</title>
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
            <title>Account Transactions {id} - Fuel Explorer</title>
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
            <title>Account NFTs {id} - Fuel Explorer</title>
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
            <title>Account Predicate {id} - Fuel Explorer</title>
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
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
