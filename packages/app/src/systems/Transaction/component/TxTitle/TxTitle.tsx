'use client';
import { Address, useBreakpoints } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import { useViewMode } from '~/systems/Core/hooks/useViewMode';

export function TxTitle({
  id,
  isLoading,
}: {
  id: string;
  isLoading?: boolean;
}) {
  const { viewMode, setViewMode } = useViewMode();
  const { isLaptop } = useBreakpoints();
  return (
    <PageTitle
      icon={<IconChecklist size={24} stroke={1.2} />}
      rightElement={
        !isLoading && <ViewMode mode={viewMode} onChange={setViewMode} />
      }
    >
      Transaction
      <Address full={isLaptop} value={id} fixed="b256" isLoading={isLoading} />
    </PageTitle>
  );
}
