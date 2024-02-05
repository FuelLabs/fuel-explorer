import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { Block } from './Block';

export function BlockLoader() {
  return (
    <Block isLoading id={'0x'} viewMode={ViewModes.Simple} producer={'0x'} />
  );
}
