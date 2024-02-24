import { Box, LoadingBox, VStack } from '@fuels/ui';
import { IconArrowsShuffle } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { BridgeTxItemsLoading } from '~portal/systems/Bridge/components';

export function BridgeScreenLoader({ view }: { view: 'history' | 'bridge' }) {
  return (
    <Box className="m-auto w-full max-w-[455px]">
      <PageTitle
        size="2"
        icon={<IconArrowsShuffle size={18} stroke={1.5} />}
        className="border-b-0 first:mb-0"
      >
        Fuel Native Bridge
      </PageTitle>
      {view === 'history' ? (
        <BridgeTxItemsLoading />
      ) : (
        <VStack gap="4">
          <LoadingBox className="w-full h-[44px]" />
          <LoadingBox className="w-full h-[200px]" />
          <LoadingBox className="w-full h-[136px]" />
        </VStack>
      )}
    </Box>
  );
}
