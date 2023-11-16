import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { getBlock } from '../actions/get-block';
import { BlockScreenAdvanced } from '../components/BlockScreenAdvanced';
import { BlockScreenSimple } from '../components/BlockScreenSimple';

type BlockScreenProps = {
  id: string;
  viewMode: ViewModes;
};

export async function BlockScreen({ id, viewMode }: BlockScreenProps) {
  const { block, producer } = await getBlock({ id });
  return (
    <>
      {viewMode === ViewModes.Simple && (
        <BlockScreenSimple block={block} producer={producer} />
      )}
      {viewMode === ViewModes.Advanced && (
        <BlockScreenAdvanced block={block ? { ...block, producer } : null} />
      )}
    </>
  );
}
