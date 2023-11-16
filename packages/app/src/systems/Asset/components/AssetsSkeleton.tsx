'use client';
import { VStack } from '@fuels/ui';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';

const PER_PAGE = 6;

export function AssetsSkeleton() {
  return (
    <VStack className="min-h-[45vh]">
      {[...Array(PER_PAGE)].map((_, i) => (
        <BalanceItem.Skeleton key={i} />
      ))}
    </VStack>
  );
}
