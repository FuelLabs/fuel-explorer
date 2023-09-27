import type { GetLastTransactionsQuery } from '@fuel-explorer/graphql';
import { Grid } from '@fuels/ui';

import { TxCard } from '../TxCard/TxCard';

type TxListProps = {
  transactions: GetLastTransactionsQuery['transactions']['edges'];
};

export function TxList({ transactions = [] }: TxListProps) {
  return (
    <Grid columns="3" gap="6">
      {transactions.map((transaction) => (
        <TxCard key={transaction.node.id} transaction={transaction.node} />
      ))}
    </Grid>
  );
}
