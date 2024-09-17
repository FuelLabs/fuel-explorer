'use client';
import { EmptyCard } from '../EmptyCard/EmptyCard';

export function EmptyAssets({ entity }: { entity: string }) {
  return (
    <EmptyCard>
      <EmptyCard.Title>No Assets</EmptyCard.Title>
      <EmptyCard.Description>
        This {entity} does not have any assets.
      </EmptyCard.Description>
    </EmptyCard>
  );
}
