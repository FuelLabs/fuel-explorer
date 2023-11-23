import { AccountLayout } from '~/systems/Account/components/AccountLayout/AccountLayout';

export default function Template({ children }: { children: React.ReactNode }) {
  return <AccountLayout>{children}</AccountLayout>;
}
