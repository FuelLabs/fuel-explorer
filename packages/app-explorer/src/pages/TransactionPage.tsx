import { useQuery } from '@tanstack/react-query';
import { ETH_CHAIN_NAME } from 'app-commons';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from '~/routes';
import { TxHeader } from '~/systems/Transaction/component/TxHeader/TxHeader';
import { TxScreenSimple } from '~/systems/Transaction/component/TxScreen/TxScreenSimple';
import { ApiService } from '../services/api';
import { peekEcosystemProjects } from '../systems/Ecosystem/utils/ecosystemProjects';
import { TxScreenAdvanced } from '../systems/Transaction/component/TxScreen/TxScreenAdvanced';
import { TxScreenStandard } from '../systems/Transaction/component/TxScreen/TxScreenStandard';
import type { TransactionNode } from '../systems/Transaction/types';
import {
  touchedContracts,
  touchesDecodableContract,
} from '../systems/Transaction/utils/decodeHints';

interface TransactionDetailsProps {
  transaction: TransactionNode;
  mode: string;
  isDecoding?: boolean;
}

function TransactionContent({
  transaction,
  mode,
  isDecoding,
}: TransactionDetailsProps) {
  switch (mode) {
    case 'simple':
      return (
        <TxScreenSimple transaction={transaction} isDecoding={isDecoding} />
      );
    case 'standard':
      return <TxScreenStandard transaction={transaction} />;
    case 'advanced':
      return <TxScreenAdvanced transaction={transaction} />;
    default:
      return (
        <TxScreenSimple transaction={transaction} isDecoding={isDecoding} />
      );
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

// With decoding inputs cached, decoding takes a few milliseconds. Waiting
// this long for it lets the page render once, without the activity card
// arriving later and moving the content.
const INLINE_DECODE_BUDGET_MS = 250;
// Longest the Simple view waits for decoding before falling back to Standard.
const SIMPLE_VIEW_WAIT_MS = 5000;

async function decodeLazily(transaction: TransactionNode) {
  const { decodeTransaction } = await import(
    '../systems/Transaction/utils/decodeTransaction'
  );
  return decodeTransaction(transaction);
}

async function fetchTransactionWithActivity(id: string) {
  const transaction: TransactionNode | null =
    await ApiService.fetchTransaction(id);
  if (!transaction || !touchedContracts(transaction.operations).size) {
    return transaction;
  }
  const decoded = await Promise.race([
    decodeLazily(transaction),
    new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), INLINE_DECODE_BUDGET_MS),
    ),
  ]);
  return decoded?.activity ? decoded : transaction;
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
    data: rawTransaction,
    dataUpdatedAt,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransactionWithActivity(id),
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

  // Only transactions that call or log from a contract can be decoded.
  const contractIds = useMemo(
    () => touchedContracts(rawTransaction?.operations),
    [rawTransaction],
  );
  const canDecode = contractIds.size > 0 && !rawTransaction?.activity;

  // Decoding fetches ABIs, so it runs after the transaction has loaded and
  // never holds the page back. The raw transaction shows in the meantime.
  // Keyed on the raw data's timestamp so a refetch (e.g. a pending tx that
  // later succeeds) is decoded again.
  const { data: decodedTransaction, isPending } = useQuery({
    queryKey: ['transaction', id, 'decoded', dataUpdatedAt],
    queryFn: () => decodeLazily(rawTransaction as TransactionNode),
    enabled: !!rawTransaction && canDecode,
    staleTime: Number.POSITIVE_INFINITY,
  });
  const isDecoding = canDecode && isPending;
  const transaction = rawTransaction?.activity
    ? rawTransaction
    : decodedTransaction?.activity
      ? decodedTransaction
      : rawTransaction;

  // Simple view waits for decoding before falling back to Standard, up to a
  // limit so a slow ABI host cannot hold the page.
  const [decodeWaitOver, setDecodeWaitOver] = useState(false);
  useEffect(() => {
    setDecodeWaitOver(false);
    if (!rawTransaction) return;
    const timer = setTimeout(
      () => setDecodeWaitOver(true),
      SIMPLE_VIEW_WAIT_MS,
    );
    return () => clearTimeout(timer);
  }, [rawTransaction]);

  // Reserve space for the activity card when this transaction touches a
  // contract with a published ABI, so the page does not jump when it lands.
  const expectsActivity =
    isDecoding &&
    touchesDecodableContract(
      contractIds,
      peekEcosystemProjects(),
      ETH_CHAIN_NAME,
    );

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
    !transaction?.activity &&
    (!transaction?.summary || transaction.summary.length === 0);

  // If Simple is disabled and user requested simple, redirect to standard
  // Use navigate instead of Navigate to avoid flash. Wait for decoding, which
  // can enable Simple for transactions without transfers.
  if (mode === 'simple' && isSimpleDisabled && isDecoding && !decodeWaitOver) {
    return (
      <div className="transaction-page">
        <TxHeader id={id} isSimple />
        <TransactionLoadingContent mode={mode} />
      </div>
    );
  }
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
          isDecoding={expectsActivity}
        />
      </div>
    </>
  );
}
