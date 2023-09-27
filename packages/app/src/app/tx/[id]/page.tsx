import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getTx } from '~/systems/Transaction/actions/get-tx';
import { TxScreen } from '~/systems/Transaction/screens/TxScreen/TxScreen';

type TransactionProps = {
  params: {
    id?: string | null;
  };
};

export default async function Transaction({
  params: { id = null },
}: TransactionProps) {
  const tx = await getTx({ id });
  return (
    <Layout>
      <TxScreen transaction={tx} />
    </Layout>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
