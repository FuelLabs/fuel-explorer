import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AccountLayout>{children}</AccountLayout>;
}
