import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from '~/routes';
import { TxHeader } from '~/systems/Transaction/component/TxHeader/TxHeader';
import { TxScreenSimple } from '~/systems/Transaction/component/TxScreen/TxScreenSimple';
import { ApiService } from '../services/api';
import { TxScreenAdvanced } from '../systems/Transaction/component/TxScreen/TxScreenAdvanced';
import { TxScreenStandard } from '../systems/Transaction/component/TxScreen/TxScreenStandard';
import type { TransactionNode } from '../systems/Transaction/types';

interface TransactionDetailsProps {
  transaction: TransactionNode;
  mode: string;
}

function TransactionContent({ transaction, mode }: TransactionDetailsProps) {
  switch (mode) {
    case 'simple':
      return <TxScreenSimple transaction={transaction} />;
    case 'standard':
      return <TxScreenStandard transaction={transaction} />;
    case 'advanced':
      return <TxScreenAdvanced transaction={transaction} />;
    default:
      return <TxScreenSimple transaction={transaction} />;
  }
}

function TransactionLoadingContent({ mode }: { mode: string }) {
  switch (mode) {
    case 'simple':
      return <TxScreenSimple isLoading={true} />;
    case 'standard':
      return <TxScreenStandard isLoading={true} />;
    case 'advanced':
      return <TxScreenAdvanced isLoading={true} />;
    default:
      return <TxScreenSimple isLoading={true} />;
  }
}

function TransactionNotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Transaction Not Found
      </h2>
      <p className="text-gray-600">
        The transaction you're looking for doesn't exist or hasn't been indexed
        yet.
      </p>
    </div>
  );
}

export function TransactionPage() {
  const { id, mode = 'simple' } = useParams<{ id: string; mode?: string }>();
  const navigate = useNavigate();

  // Redirect if no transaction ID
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const {
    data: transaction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => ApiService.fetchTransaction(id),
    retry: (failureCount, error: unknown) => {
      // Don't retry on 404 errors
      const message =
        typeof error === 'object' && error !== null && 'toString' in error
          ? String(error)
          : '';
      if (message.includes('404')) return false;
      return failureCount < 3;
    },
  });

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Transaction - Fuel Explorer</title>
        </Helmet>
        <div className="transaction-page">
          <TxHeader id={id} isSimple={mode === 'simple'} />
          <TransactionLoadingContent mode={mode} />
        </div>
      </>
    );
  }

  // Handle not found
  if (
    !transaction ||
    (typeof error === 'object' && error && String(error).includes('404'))
  ) {
    return (
      <>
        <Helmet>
          <title>Transaction Not Found - Fuel Explorer</title>
        </Helmet>
        <TransactionNotFound />
      </>
    );
  }

  // Handle other errors
  if (error) {
    return (
      <>
        <Helmet>
          <title>Error - Fuel Explorer</title>
        </Helmet>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load transaction details</p>
          <button
            onClick={() => window.location.reload()}
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  // Check if Simple view is available
  const isSimpleDisabled =
    !transaction?.summary || transaction.summary.length === 0;

  // If Simple is disabled and user requested simple, redirect to standard
  // Use navigate instead of Navigate to avoid flash
  if (mode === 'simple' && isSimpleDisabled) {
    navigate(Routes.txStandard(id), { replace: true });
    // Show standard view while redirecting
    return (
      <>
        <Helmet>
          <title>{`Transaction ${id.slice(0, 8)}... - Fuel Explorer`}</title>
          <meta
            name="description"
            content={`View details for transaction ${id} on the Fuel blockchain`}
          />
        </Helmet>

        <div className="transaction-page">
          <TxHeader
            id={id}
            isLoading={false}
            isSimple={false}
            isSimpleDisabled={isSimpleDisabled}
          />
          <TransactionContent transaction={transaction} mode="standard" />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Transaction ${id.slice(0, 8)}... - Fuel Explorer`}</title>
        <meta
          name="description"
          content={`View details for transaction ${id} on the Fuel blockchain`}
        />
      </Helmet>

      <div className="transaction-page">
        <TxHeader
          id={id}
          isLoading={false}
          isSimple={mode === 'simple'}
          isSimpleDisabled={isSimpleDisabled}
        />

        <TransactionContent
          transaction={transaction}
          mode={mode || 'standard'}
        />
      </div>
    </>
  );
}
