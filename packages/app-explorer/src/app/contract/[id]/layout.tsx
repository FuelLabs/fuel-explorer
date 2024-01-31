import { ContractHeader } from '~/systems/Contract/components/ContractHeader';
import type { ContractRouteParams } from '~/systems/Contract/types';

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: ContractRouteParams;
}) {
  return (
    <>
      <ContractHeader id={id} />
      {children}
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
