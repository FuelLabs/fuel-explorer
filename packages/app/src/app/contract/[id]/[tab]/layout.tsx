import { ContractLayout } from '~/systems/Contract/components/ContractLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ContractLayout>{children}</ContractLayout>;
}
