import { getPredicateBytecode } from '~/systems/Account/actions/get-predicate-bytecode';
import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const bytecode = await getPredicateBytecode({ owner: id });
  return (
    <AccountLayout id={id} bytecode={bytecode}>
      {children}
    </AccountLayout>
  );
}
