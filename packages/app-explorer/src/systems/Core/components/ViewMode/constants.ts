export enum ViewModes {
  Standard = 'standard',
  Simple = 'simple',
  Advanced = 'advanced',
}

export const VIEW_MODE_LABELS: Record<ViewModes, string> = {
  [ViewModes.Standard]: 'Standard',
  [ViewModes.Simple]: 'Simple',
  [ViewModes.Advanced]: 'Advanced',
};
