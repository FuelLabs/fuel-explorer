'use client';

import { Address, useBreakpoints } from '@fuels/ui';
import { PageTitle } from 'app-commons';

export function ContractTitle({ id }: { id: string }) {
  const { isLaptop } = useBreakpoints();
  return (
    <PageTitle
      title="Contract"
      subtitle={<Address value={id} full={isLaptop} fixed="b256" />}
    />
  );
}
