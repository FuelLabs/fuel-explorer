import { ContractLayout } from '~/systems/Contract/components/ContractLayout';

export default function Layout({
  children,
  params: { address },
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  return <ContractLayout id={address}>{children}</ContractLayout>;
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
