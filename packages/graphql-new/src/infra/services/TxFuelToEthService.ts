import {
  type Address,
  type Provider,
  type TransactionResult,
  getReceiptsMessageOut,
  getTransactionsSummaries,
} from 'fuels';

type TxFuelToEthInputs = {
  fetchTransactions: {
    address: Address;
  };
};

export class TxFuelToEthService {
  private provider: Provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  async fetchTransactions({
    address,
  }: TxFuelToEthInputs['fetchTransactions']): Promise<TransactionResult[]> {
    const { transactions } = await getTransactionsSummaries({
      provider: this.provider,
      filters: {
        owner: address.toB256(),
        first: 1000,
      },
    });

    return transactions.filter(this.hasMessageOut);
  }

  private hasMessageOut(transaction: TransactionResult): boolean {
    const { receipts } = transaction;
    return !!getReceiptsMessageOut(receipts)?.[0];
  }
}
