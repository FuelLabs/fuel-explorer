'use client';
import { Grid, Box, VStack } from '@fuels/ui';
import { LoadingBox } from '~/systems/Core/components/LoadingBox/LoadingBox';

export function TxScreenSkeleton() {
  return (
    <Grid className="grid-cols-1 gap-10 laptop:grid-cols-[300px_1fr] laptop:items-start">
      <Box className="grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-1">
        <LoadingBox className="h-[80px]" />
        <LoadingBox className="h-[80px]" />
        <LoadingBox className="h-[80px]" />
        <LoadingBox className="h-[80px]" />
      </Box>
      <VStack className="gap-8 laptop:gap-14">
        <Grid className="grid grid-cols-[1fr_2fr] gap-6">
          <LoadingBox className="h-6" />
          <LoadingBox className="h-20 col-start-1 col-end-3" />
        </Grid>
        <Grid className="grid grid-cols-[1fr_2fr] gap-6">
          <LoadingBox className="h-6" />
          <LoadingBox className="h-20 col-start-1 col-end-3" />
        </Grid>
      </VStack>
    </Grid>
  );
}
