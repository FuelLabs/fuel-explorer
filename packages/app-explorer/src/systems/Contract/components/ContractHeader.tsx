'use client';

import { Address } from '@fuels/ui';

import { PageTitle } from 'app-commons';
import { ContractTabs } from './ContractTabs';

export function ContractHeader({ id }: { id: string }) {
  return (
    <>
      <PageTitle
        title="Contract"
        subtitle={<Address value={id} full={true} fixed="b256" />}
      />
      <ContractTabs contractId={id} />
    </>
  );
}
