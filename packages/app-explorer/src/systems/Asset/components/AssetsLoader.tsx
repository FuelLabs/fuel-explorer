'use client';
import { VStack } from '@fuels/ui';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';

const PER_PAGE = 4;

export function AssetsLoader() {
  return (
    <VStack className="min-h-[45vh]">
      {[...Array(PER_PAGE)].map((_, i) => (
        <BalanceItem key={i} isLoading item={{ assetId: '0x00' } as any} />
      ))}
    </VStack>
  );
}
