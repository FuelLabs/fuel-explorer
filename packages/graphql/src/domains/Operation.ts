import { groupBy, sortBy } from 'lodash';

import type { TransactionItemFragment } from '../generated/types';

type Tx = TransactionItemFragment;

export class OperationDomain {
  constructor() {}

  async operationsFromTransaction(transaction: Tx) {
    const receipts = transaction.receipts ?? [];
    const groups = groupBy(receipts, (receipt) => {
      return (
        receipt.contract?.id ??
        receipt.contractId ??
        receipt.to?.id ??
        receipt.sender
      );
    });

    const operations = Object.entries(groups).map(([, receipts]) => {
      const firstReceipt = receipts[0];
      let type = null;
      if (firstReceipt.contract || firstReceipt.contractId || firstReceipt.to) {
        type = 'FROM_CONTRACT';
      }
      if (firstReceipt.sender) {
        type = 'FROM_ACCOUNT';
      }
      return { type, receipts };
    });

    return sortBy(operations, 'type');
  }
}
