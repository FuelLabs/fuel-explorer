'use client';
import { Address, useBreakpoints } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { useParams } from 'next/navigation';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import type { ViewModes } from '~/systems/Core/components/ViewMode/constants';

export function TxHeader({
  id,
  isLoading,
}: {
  id: string;
  isLoading?: boolean;
}) {
  const { isLaptop } = useBreakpoints();
  const { mode } = useParams<{ mode: ViewModes }>();

  return (
    <PageTitle
      title="Transaction"
      subtitle={<Address full={isLaptop} value={id} fixed="b256" />}
    >
      {!isLoading && <ViewMode mode={mode} />}
    </PageTitle>
  );
}
