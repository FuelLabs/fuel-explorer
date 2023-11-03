import {
  getContract,
  getContractBalances,
} from '~/systems/Contract/actions/get-contract';
import { ContractScreen } from '~/systems/Contract/screens/ContractScreen/ContractScreen';
import { Layout } from '~/systems/Core/components/Layout/Layout';

type ContractProps = {
  params: {
    id?: string | null;
  };
};

export default async function ContractAssets({
  params: { id = null },
}: ContractProps) {
  const contract = await getContract({ id });
  const contractBalances = await getContractBalances({ id });

  return (
    <Layout>
      <ContractScreen contract={contract} contractBalances={contractBalances} />
    </Layout>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
