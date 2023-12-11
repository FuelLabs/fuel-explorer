import { ContractLayout } from '~/systems/Contract/components/ContractLayout';

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <ContractLayout id={id}>{children}</ContractLayout>;
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
