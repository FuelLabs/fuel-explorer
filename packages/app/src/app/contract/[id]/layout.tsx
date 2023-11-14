import { getContract } from '~/systems/Contract/actions/get-contract';
import { ContractTitle } from '~/systems/Contract/components/ContractTitle';
import { Layout } from '~/systems/Core/components/Layout/Layout';

export default async function ContractLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const contract = await getContract({ id });
  if (!contract) return null;
  return (
    <Layout>
      <ContractTitle contract={contract} className="mb-0 tablet:mb-8" />
      {children}
    </Layout>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
