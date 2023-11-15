'use client';
import type { GetLastTransactionsQuery } from '@fuel-explorer/graphql';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

export function AccountTransactions({
  transactions,
}: {
  transactions: GetLastTransactionsQuery['transactions']['edges'];
}) {
  if (!transactions.length) {
    return (
      <EmptyCard>
        <EmptyCard.Title>No Transactions</EmptyCard.Title>
        <EmptyCard.Description>
          This account does not have any transaction.
        </EmptyCard.Description>
      </EmptyCard>
    );
  }

  return <TxList hidePagination transactions={transactions} className="p-0" />;
}
