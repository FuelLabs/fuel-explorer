import { Grid, VStack } from '@fuels/ui';
import { LoadingBox } from '~/systems/Core/components/LoadingBox/LoadingBox';
import { TxListSkeleton } from '~/systems/Transaction/component/TxList/TxListSkeleton';

export function BlockScreenSkeleton() {
  return (
    <VStack>
      <Grid className="grid-rows-4 tablet:grid-rows-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-6 mb-8">
        <LoadingBox className="h-[100px]" />
        <LoadingBox className="h-[100px]" />
        <LoadingBox className="h-[100px]" />
        <LoadingBox className="h-[100px]" />
      </Grid>
      <Grid className="grid grid-cols-[1fr_2fr] gap-6">
        <LoadingBox className="h-6" />
        <div className="col-start-1 col-end-3">
          <TxListSkeleton />
        </div>
      </Grid>
    </VStack>
  );
}
