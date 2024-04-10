import { getBlock } from '../actions/get-block';
import { BlockScreenSimple } from '../components/BlockScreenSimple';
import type { BlockRouteParams } from '../types';

export async function BlockScreenSimpleSync({ id }: BlockRouteParams) {
  const { block, producer } = await getBlock({ id });

  return <BlockScreenSimple block={block} producer={producer} />;
}
