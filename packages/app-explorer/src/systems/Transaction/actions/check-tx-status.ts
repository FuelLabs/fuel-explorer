import { isValidAddress } from '~/systems/Core/utils/address';
import { PendingTxResponse } from '~/systems/Transaction/constants/pendingTxResponse';
import {} from '~/systems/Transaction/constants/tags';
import type {
  IndexedTransaction,
  PendingTransaction,
} from '~/systems/Transaction/types';

import { isPendingTx } from '~/systems/Transaction/utils/isPendingTx';

export async function checkTxStatus({
  id,
  tx,
  revalidate,
}: {
  id: string;
  tx: IndexedTransaction | PendingTransaction;
  revalidate: boolean;
}) {
  if (!isValidAddress(id)) {
    return PendingTxResponse.InvalidInput;
  }

  if (isPendingTx({ tx }) === false) {
    return PendingTxResponse.NotPending;
  }

  if (revalidate) {
    // Note: revalidateTag is Next.js specific, caching handled differently in Vite
  }

  return PendingTxResponse.Pending;
}
