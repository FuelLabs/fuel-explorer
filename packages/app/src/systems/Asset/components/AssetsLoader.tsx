/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { VStack } from '@fuels/ui';
import { BaseAssetId } from 'fuels';
import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';

const PER_PAGE = 4;

export function AssetsLoader() {
  return (
    <VStack className="min-h-[45vh]">
      {[...Array(PER_PAGE)].map((_, i) => (
        <BalanceItem key={i} isLoading item={{ assetId: BaseAssetId } as any} />
      ))}
    </VStack>
  );
}
