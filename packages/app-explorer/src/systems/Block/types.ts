import type { ViewModes } from '../Core/components/ViewMode/constants';

export type BlockRouteParams = {
  id: string;
  mode?: ViewModes;
};

export type BlockRouteProps = {
  params: BlockRouteParams;
};
