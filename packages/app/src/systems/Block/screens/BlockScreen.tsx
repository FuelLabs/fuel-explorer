import type { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { getBlock } from '../actions/get-block';
import { Block } from '../components/Block';

type BlockScreenProps = {
  id: string;
  viewMode: ViewModes;
};

export async function BlockScreen({ id, viewMode }: BlockScreenProps) {
  const { block, producer } = await getBlock({ id });
  return (
    <Block id={id} viewMode={viewMode} block={block} producer={producer} />
  );
}
