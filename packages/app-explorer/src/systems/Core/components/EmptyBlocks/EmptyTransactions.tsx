'use client';
import { EmptyCard } from '../EmptyCard/EmptyCard';

export function EmptyTransactions({ entity }: { entity: string }) {
  return (
    <EmptyCard>
      <EmptyCard.Title>No Transaction</EmptyCard.Title>
      <EmptyCard.Description>
        This {entity} does not have any transactions.
      </EmptyCard.Description>
    </EmptyCard>
  );
}
