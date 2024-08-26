import { AccountHeader } from '~/systems/Account/components/AccountHeader';
import type { AccountRouteParams } from '~/systems/Account/types';

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: AccountRouteParams;
}) {
  return (
    <>
      <AccountHeader id={id} />
      {children}
    </>
  );
}

export const revalidate = 10;
