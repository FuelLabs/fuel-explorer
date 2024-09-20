'use client';
import { Address, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { useParams } from 'next/navigation';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import type { ViewModes } from '~/systems/Core/components/ViewMode/constants';

import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockHeader({
  producer,
  isLoading,
}: {
  producer: string | null | undefined;
  isLoading?: boolean;
}) {
  const { mode } = useParams<{ mode: ViewModes }>();
  return (
    <PageTitle
      title="Block"
      subtitle={
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-20 h-5 mt-1" />}
          regularEl={
            //
            isValidAddress(producer) ? (
              <Address full value={producer || ''} fixed="b256" />
            ) : (
              <>#{producer}</>
            )
          }
        />
      }
    >
      {!isLoading && <ViewMode mode={mode} />}
    </PageTitle>
  );
}
