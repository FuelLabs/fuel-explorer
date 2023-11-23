'use client';
import { Address, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import { useViewMode } from '~/systems/Core/hooks/useViewMode';
import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockTitle({
  id,
  isLoading,
}: {
  id: string;
  isLoading?: boolean;
}) {
  const { viewMode, setViewMode } = useViewMode();
  return (
    <PageTitle
      icon={<IconCube size={24} stroke={2.4} />}
      rightElement={
        !isLoading && <ViewMode mode={viewMode} onChange={setViewMode} />
      }
    >
      Block
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-20 h-5 mt-1" />}
        regularEl={
          isValidAddress(id) ? (
            <Address full value={id || ''} fixed="b256" />
          ) : (
            <PageSubtitle>#{id}</PageSubtitle>
          )
        }
      />
    </PageTitle>
  );
}
