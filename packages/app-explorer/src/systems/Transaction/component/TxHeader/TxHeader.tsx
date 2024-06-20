'use client';
import { Address, useBreakpoints } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <PageTitle
      icon={<IconChecklist size={24} stroke={1.2} />}
      rightElement={!isLoading && <ViewMode mode={mode} router={router} />}
    >
      Transaction
      <Address full={isLaptop} value={id} fixed="b256" />
    </PageTitle>
  );
}
