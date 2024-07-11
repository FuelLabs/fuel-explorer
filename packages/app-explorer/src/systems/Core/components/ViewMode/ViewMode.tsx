import { ToggleGroup } from '@fuels/ui';
import { ViewModes } from './constants';

export function ViewMode({ mode }: { mode: ViewModes }) {
  return (
    <ToggleGroup defaultValue={mode} aria-label="View mode">
      <ToggleGroup.Item
        href={`./${ViewModes.Simple}`}
        value="simple"
        aria-label="Simple view"
      >
        Simple
      </ToggleGroup.Item>
      <ToggleGroup.Item
        href={`./${ViewModes.Advanced}`}
        value="advanced"
        aria-label="Advanced view"
      >
        Advanced
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
