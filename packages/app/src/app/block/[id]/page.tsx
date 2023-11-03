import { getBlock } from '~/systems/Block/actions/get-block';
import { BlockScreen } from '~/systems/Block/screens/BlockScreen';
import { Layout } from '~/systems/Core/components/Layout/Layout';

type BlockProps = {
  params: {
    id: string | null;
  };
};

export default async function Block({ params: { id = null } }: BlockProps) {
  const { block, producer } = await getBlock({ id });
  return (
    <Layout>
      <BlockScreen blockNumber={id} block={block} producer={producer} />
    </Layout>
  );
}
