import type {
  SuccessStatus,
  TransactionItemFragment,
} from '../generated/types';
import ReceiptsParser from './ReceiptsParser';
import ReceiptsParserAdapter from './ReceiptsParserAdapter';

type Tx = TransactionItemFragment;

export class OperationDomain {
  async operationsFromTransaction(transaction: Tx) {
    if (transaction.status?.__typename !== 'SuccessStatus') return [];
    const status = transaction.status as SuccessStatus;
    const receipts = status?.receipts || [];
    const parser = new ReceiptsParserAdapter(new ReceiptsParser());
    const output = parser.parse(receipts);
    return output;
  }
}
