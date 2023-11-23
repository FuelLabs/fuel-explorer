'use client';

import { Address, useBreakpoints } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

export function AccountTitle({
  id,
  isLoading,
}: {
  id: string;
  isLoading?: boolean;
}) {
  const { isLaptop } = useBreakpoints();
  return (
    <PageTitle
      icon={<IconHash size={20} stroke={1.2} />}
      className="border-b-gray-3"
    >
      Account
      <Address isLoading={isLoading} full={isLaptop} value={id} />
    </PageTitle>
  );
}
