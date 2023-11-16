'use client';
import { Grid } from '@fuels/ui';

import { TxCard } from '../../component/TxCard/TxCard';

const PER_PAGE = 9;

export function TxListSkeleton() {
  return (
    <Grid className="grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:gap-x-8 gap-y-6 gap-x-6">
      {[...Array(PER_PAGE)].map((_, i) => (
        <TxCard.Skeleton key={i} />
      ))}
    </Grid>
  );
}
