import { Box, LoadingBox, VStack } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { BridgeTxItemsLoading } from 'app-portal';

export function BridgeScreenLoader({ view }: { view: 'history' | 'bridge' }) {
  return (
    <Box className="m-auto w-full max-w-[455px]">
      <PageTitle title="Fuel Bridge" />
      {view === 'history' ? (
        <BridgeTxItemsLoading />
      ) : (
        <VStack gap="4">
          <LoadingBox className="w-full h-9" />
          <LoadingBox className="w-full h-[201px]" />
          <LoadingBox className="w-full h-[151px]" />
        </VStack>
      )}
    </Box>
  );
}
