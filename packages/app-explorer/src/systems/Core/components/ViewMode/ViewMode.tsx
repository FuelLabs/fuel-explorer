import { ToggleGroup } from '@fuels/ui';
import { useRouter } from 'next/navigation';

export enum ViewModes {
  Simple = 'simple',
  Advanced = 'advanced',
}

export function ViewMode({
  mode,
  router,
}: { mode: ViewModes; router: ReturnType<typeof useRouter> }) {
  return (
    <ToggleGroup defaultValue={mode} aria-label="View mode">
      <ToggleGroup.Item
        value="simple"
        aria-label="Simple view"
        onClick={() => router.push(`./${ViewModes.Simple}`)}
      >
        Simple
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="advanced"
        aria-label="Advanced view"
        onClick={() => router.push(`./${ViewModes.Advanced}`)}
      >
        Advanced
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
