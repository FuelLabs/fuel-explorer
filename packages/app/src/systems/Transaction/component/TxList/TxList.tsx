import { Grid } from 'pn-ui-primitives/Box';

import type { TransactionNode } from '../../types';
import { TxCard } from '../TxCard/TxCard';

type TxListProps = {
  transactions: TransactionNode[];
};

export function TxList({ transactions = [] }: TxListProps) {
  return (
    <Grid columns="3" gap="6">
      {transactions.map((transaction) => (
        <TxCard key={transaction.id} transaction={transaction} />
      ))}
    </Grid>
  );
}
