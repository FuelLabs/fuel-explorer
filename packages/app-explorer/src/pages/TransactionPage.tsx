import { Button } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import { ETH_CHAIN_NAME } from 'app-commons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from '~/routes';
import { PageState } from '~/systems/Core/components/PageState/PageState';
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
  const { t } = useTranslation();
  return (
    <PageState
      title={t('tx.not_found_title')}
      description={t('tx.not_found_body')}
    />
  );
}

export function TransactionPage() {
  const { id, mode = 'simple' } = useParams<{ id: string; mode?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  // Check if Simple view is available
  const isSimpleDisabled =
    !transaction?.activity &&
    (!transaction?.summary || transaction.summary.length === 0);
  const isHandledError =
    !transaction ||
    (typeof error === 'object' && error && String(error).includes('404')) ||
    Boolean(error);
  const isWaitingForSimple = isDecoding && !decodeWaitOver;
  const redirectToStandard =
    !isLoading &&
    !isHandledError &&
    mode === 'simple' &&
    isSimpleDisabled &&
    !isWaitingForSimple;

  // Navigating during render is a side effect, so the redirect runs in an
  // effect. The standard view shows meanwhile.
  useEffect(() => {
    if (redirectToStandard) {
      navigate(Routes.txStandard(id), { replace: true });
    }
  }, [redirectToStandard, navigate, id]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t('meta.tx_loading')}</title>
        </Helmet>
        <div className="transaction-page">
          <TxHeader id={id} isSimple={mode === 'simple'} />
          <div key="loading">
            <TransactionLoadingContent mode={mode} />
          </div>
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
          <title>{t('meta.tx_not_found')}</title>
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
          <title>{t('meta.error')}</title>
        </Helmet>
        <PageState
          tone="error"
          title={t('tx.error_title')}
          description={t('tx.error_body')}
          action={
            <Button
              variant="ghost"
              color="gray"
              onClick={() => window.location.reload()}
            >
              {t('tx.retry')}
            </Button>
          }
        />
      </>
    );
  }

  // While Simple is unavailable and a decode may still fill it in, keep the loader.
  if (mode === 'simple' && isSimpleDisabled && isWaitingForSimple) {
    return (
      <div className="transaction-page">
        <TxHeader id={id} isSimple />
        <div key="loading">
          <TransactionLoadingContent mode={mode} />
        </div>
      </div>
    );
  }
  if (mode === 'simple' && isSimpleDisabled) {
    // The effect above navigates. Show the standard view in the meantime.
    return (
      <>
        <Helmet>
          <title>{t('meta.tx_title', { id: id.slice(0, 8) })}</title>
          <meta name="description" content={t('meta.tx_description', { id })} />
        </Helmet>

        <div className="transaction-page">
          <TxHeader
            id={id}
            isLoading={false}
            isSimple={false}
            isSimpleDisabled={isSimpleDisabled}
          />
          <div key="standard" className="fuel-appear">
            <TransactionContent transaction={transaction} mode="standard" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('meta.tx_title', { id: id.slice(0, 8) })}</title>
        <meta name="description" content={t('meta.tx_description', { id })} />
      </Helmet>

      <div className="transaction-page">
        <TxHeader
          id={id}
          isLoading={false}
          isSimple={mode === 'simple'}
          isSimpleDisabled={isSimpleDisabled}
        />

        {/* Keyed by mode so a switch fades in the new view without passing through the loader. */}
        <div key={mode || 'standard'} className="fuel-appear">
          <TransactionContent
            transaction={transaction}
            mode={mode || 'standard'}
            isActivityLoading={expectsActivity}
          />
        </div>
      </div>
    </>
  );
}
