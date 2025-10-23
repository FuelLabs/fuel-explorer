import { EmptyCard } from '../EmptyCard/EmptyCard';

export function EmptyNfts({ entity }: { entity: string }) {
  return (
    <EmptyCard>
      <EmptyCard.Title>No NFTs</EmptyCard.Title>
      <EmptyCard.Description>
        This {entity} does not have any nft.
      </EmptyCard.Description>
    </EmptyCard>
  );
}
