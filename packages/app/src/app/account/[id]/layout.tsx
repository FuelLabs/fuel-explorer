import { getPredicate } from '~/systems/Account/actions/get-predicate';
import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const predicate = await getPredicate({ owner: id });
  return (
    <AccountLayout id={id} bytecode={predicate?.bytecode}>
      {children}
    </AccountLayout>
  );
}
