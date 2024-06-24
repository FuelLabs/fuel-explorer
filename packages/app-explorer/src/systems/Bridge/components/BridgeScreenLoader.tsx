import { Box, LoadingBox, VStack } from '@fuels/ui';
import { IconArrowsShuffle } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { BridgeTxItemsLoading } from 'app-portal';

export function BridgeScreenLoader({ view }: { view: 'history' | 'bridge' }) {
  return (
    <Box className="m-auto w-full max-w-[455px]">
      <PageTitle
        size="2"
        icon={<IconArrowsShuffle size={18} stroke={1.5} />}
        className="border-b-0 first:mb-0"
      >
        Fuel Bridge
      </PageTitle>
      {view === 'history' ? (
        <BridgeTxItemsLoading />
      ) : (
        <VStack gap="4">
          <LoadingBox className="w-full h-[var(--space-6)]" />
          <LoadingBox className="w-full h-[201px]" />
          <LoadingBox className="w-full h-[151px]" />
        </VStack>
      )}
    </Box>
  );
}
