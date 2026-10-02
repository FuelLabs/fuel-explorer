import { Button } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { ETH_CHAIN_NAME } from 'app-commons';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  isActivityLoading?: boolean;
}

function TransactionContent({
  transaction,
  mode,
  isActivityLoading,
}: TransactionDetailsProps) {
  switch (mode) {
    case 'simple':
      return (
        <TxScreenSimple
          transaction={transaction}
          isActivityLoading={isActivityLoading}
        />
      );
    case 'standard':
      return <TxScreenStandard transaction={transaction} />;
    case 'advanced':
      return <TxScreenAdvanced transaction={transaction} />;
    default:
      return (
        <TxScreenSimple
          transaction={transaction}
          isActivityLoading={isActivityLoading}
        />
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

const INLINE_DECODE_BUDGET_MS = 250;
const SIMPLE_VIEW_WAIT_MS = 5000;

// Never rejects: a failed import or decode returns the transaction as is.
async function decodeLazily(
  transaction: TransactionNode,
): Promise<TransactionNode> {
  try {
    const { decodeTransaction } = await import(
      '../systems/Transaction/utils/decodeTransaction'
    );
    return await decodeTransaction(transaction);
  } catch (error) {
    console.error('Failed to decode transaction:', error);
    return transaction;
  }
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

  const contractIds = useMemo(
    () => touchedContracts(rawTransaction?.operations),
    [rawTransaction],
  );
  const canDecode = contractIds.size > 0 && !rawTransaction?.activity;

  // Keyed on dataUpdatedAt so refetched data is decoded again.
  const { data: decodedTransaction, isPending } = useQuery({
    queryKey: ['transaction', id, 'decoded', dataUpdatedAt],
    queryFn: () => decodeLazily(rawTransaction as TransactionNode),
    enabled: !!rawTransaction && canDecode,
    staleTime: Number.POSITIVE_INFINITY,
  });

  // Receipts never change, so the last decoded result survives refetches.
  const lastDecoded = useRef<{
    id: string;
    operations: TransactionNode['operations'];
    activity: NonNullable<TransactionNode['activity']>;
  } | null>(null);
  const freshDecoded = rawTransaction?.activity
    ? rawTransaction
    : decodedTransaction?.activity
      ? decodedTransaction
      : null;
  if (freshDecoded?.activity) {
    lastDecoded.current = {
      id,
      operations: freshDecoded.operations,
      activity: freshDecoded.activity,
    };
  }
  const kept = lastDecoded.current?.id === id ? lastDecoded.current : null;
  const isDecoding = canDecode && isPending && !kept;
  const transaction = useMemo(
    () =>
      freshDecoded ??
      (kept && rawTransaction
        ? {
            ...rawTransaction,
            operations: kept.operations,
            activity: kept.activity,
          }
        : rawTransaction),
    [freshDecoded, kept, rawTransaction],
  );

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
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </>
    );
  }

  // Check if Simple view is available
  const isSimpleDisabled =
    !transaction?.activity &&
    (!transaction?.summary || transaction.summary.length === 0);

  // If Simple is disabled and user requested simple, redirect to standard
  // Use navigate instead of Navigate to avoid flash
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
          isActivityLoading={expectsActivity}
        />
      </div>
    </>
  );
}
