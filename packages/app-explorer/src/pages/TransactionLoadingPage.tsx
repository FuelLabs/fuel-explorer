import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { TxScreenLoader } from '~/systems/Transaction/component/TxScreen/TxScreenLoader';
import { useTransactionStatus } from '~/systems/Transaction/hooks/useTransactionStatus';
import { ApiService } from '../services/api';

export default function TransactionLoadingPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const { data: status } = useTransactionStatus({ txId: id });

  // Keep a lightweight existence check to align with Next's early gating
  const { data: exists } = useQuery({
    queryKey: ['tx-exists', id],
    queryFn: () => new ApiService('').txExists(id),
    retry: 1,
  });

  // Determine redirect: when not pending anymore and we have a tx, go to simple tab
  const shouldRedirect =
    Boolean(exists) && Boolean(status && !status.isStatusPending);

  // TxScreenLoader handles the client-side redirect and periodic refresh behavior
  return <TxScreenLoader id={id} shouldRedirect={shouldRedirect} />;
}
