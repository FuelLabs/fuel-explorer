import { TxHeader } from '~/systems/Transaction/component/TxHeader/TxHeader';
import type { TxRouteParams } from '~/systems/Transaction/types';

export default function TxLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: TxRouteParams;
}) {
  return (
    <>
      <TxHeader id={id} />
      {children}
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
