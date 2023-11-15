import { getContract } from '~/systems/Contract/actions/get-contract';
import { ContractLayout } from '~/systems/Contract/components/ContractLayout';

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const contract = await getContract({ id });
  if (!contract) return null;
  return <ContractLayout contract={contract}>{children}</ContractLayout>;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
