import type {
  IndexedTransaction,
  PendingTransaction,
} from '~/systems/Transaction/types';

type Input = {
  tx: IndexedTransaction | PendingTransaction | undefined;
};

export const isPendingTx = ({ tx }: Input) => {
  try {
    if (!tx) {
      return true;
    }

    return tx.status === 'indexing';
  } catch (_) {
    return true;
  }
};
