import { getBlock } from '../actions/get-block';
import { BlockScreenAdvanced } from '../components/BlockScreenAdvanced';
import { BlockScreenSimple } from '../components/BlockScreenSimple';

type BlockScreenProps = {
  id: string;
};

export async function BlockScreenSimpleSync({ id }: BlockScreenProps) {
  const { block, producer } = await getBlock({ id });
  return <BlockScreenSimple block={block} producer={producer} />;
}

export async function BlockScreenAdvancedSync({ id }: BlockScreenProps) {
  const { block, producer } = await getBlock({ id });
  return <BlockScreenAdvanced block={block ? { ...block, producer } : null} />;
}
