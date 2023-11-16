import { getBlock } from '~/systems/Block/actions/get-block';
import { BlockScreen } from '~/systems/Block/screens/BlockScreen';

type BlockProps = {
  params: {
    id: string | null;
  };
};

export default async function Block({ params: { id = null } }: BlockProps) {
  const { block, producer } = await getBlock({ id });
  return <BlockScreen blockNumberOrId={id} block={block} producer={producer} />;
}
