import { BlockScreen } from '~/systems/Block/screens/BlockScreen';
import { Layout } from '~/systems/Core/components/Layout/Layout';

type BlockProps = {
  params: {
    id: string | null;
  };
};

export default async function Block({ params: { id = null } }: BlockProps) {
  return (
    <Layout>
      <BlockScreen blockNumber={id} />
    </Layout>
  );
}
