'use client';

import { Address, useBreakpoints } from '@fuels/ui';
import { PageTitle } from 'app-commons';

export function AccountTitle({ id }: { id: string }) {
  const { isLaptop } = useBreakpoints();

  return (
    <PageTitle
      title="Account"
      subtitle={<Address full={isLaptop} value={id} />}
    />
  );
}
