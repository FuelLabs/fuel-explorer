'use client';

import { Address, useBreakpoints } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';

export function AccountTitle({ id }: { id: string }) {
  const { isLaptop } = useBreakpoints();
  return (
    <PageTitle
      icon={<IconHash size={20} stroke={1.2} />}
      className="border-b-gray-3"
    >
      Account
      <Address full={isLaptop} value={id} />
    </PageTitle>
  );
}
