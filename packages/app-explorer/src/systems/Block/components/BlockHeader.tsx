'use client';
import { Address, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockHeader({
  id,
  isLoading,
}: {
  id: string;
  isLoading?: boolean;
}) {
  return (
    <PageTitle
      icon={<IconCube size={24} stroke={2.4} />}
      rightElement={!isLoading && <ViewMode />}
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
