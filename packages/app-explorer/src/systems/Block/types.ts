import type { ViewModes } from "../Core/components/ViewMode/ViewMode";

export type BlockRouteParams = {
  id: string;
  mode?: ViewModes;
};

export type BlockRouteProps = {
  params: BlockRouteParams;
};
