import { getBlock } from '../actions/get-block';
import { BlockScreenAdvanced } from '../components/BlockScreenAdvanced';
import type { BlockRouteParams } from '../types';

export async function BlockScreenAdvancedSync({ id }: BlockRouteParams) {
  const { block, producer } = await getBlock({ id });
  return <BlockScreenAdvanced block={block ? { ...block, producer } : null} />;
}
