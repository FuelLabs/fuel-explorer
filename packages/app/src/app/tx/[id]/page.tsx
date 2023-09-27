import { Layout } from '~/systems/Core/components/Layout/Layout';
import { getTx } from '~/systems/Transaction/actions/get-tx';
import { TxScreen } from '~/systems/Transaction/screens/TxScreen/TxScreen';

type TransactionProps = {
  params: {
    id: string;
  };
};

export default async function Transaction({ params }: TransactionProps) {
  const id = params.id;
  const tx = await getTx({ id });
  if (!tx) {
    throw new Error('Transaction not found');
  }
  return (
    <Layout>
      <TxScreen transaction={tx} />
    </Layout>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
