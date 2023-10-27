import { getContract } from '~/systems/Contract/actions/get-contract';
import { ContractScreen } from '~/systems/Contract/screens/ContractScreen/ContractScreen';
import { Layout } from '~/systems/Core/components/Layout/Layout';

type ContractProps = {
  params: {
    id?: string | null;
  };
};

export default async function Contract({
  params: { id = null },
}: ContractProps) {
  const contract = await getContract({ id });
  return (
    <Layout>
      <ContractScreen contract={contract} />
    </Layout>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
