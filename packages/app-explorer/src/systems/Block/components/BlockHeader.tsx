'use client';
import { Address, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { useParams } from 'next/navigation';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import type { ViewModes } from '~/systems/Core/components/ViewMode/constants';

import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockHeader({
  id,
  isLoading,
}: {
  id: string;
  isLoading?: boolean;
}) {
  const { mode } = useParams<{ mode: ViewModes }>();
  return (
    <PageTitle
      icon={<IconCube size={24} stroke={2.4} />}
      rightElement={!isLoading && <ViewMode mode={mode} />}
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
