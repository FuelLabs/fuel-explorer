import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <AccountLayout id={id}>{children}</AccountLayout>;
}
