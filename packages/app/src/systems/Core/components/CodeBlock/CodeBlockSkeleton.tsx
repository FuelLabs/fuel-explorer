'use client';
import { Card, Grid } from '@fuels/ui';

import { LoadingBox } from '../LoadingBox/LoadingBox';

export function CodeBlockSkeleton() {
  return (
    <Card>
      <Grid className="grid grid-cols-[1fr_2fr] gap-4 mx-4">
        <LoadingBox className="h-6" />
        <LoadingBox className="h-20 col-start-1 col-end-3" />
      </Grid>
    </Card>
  );
}
