'use client';

import { ToggleGroup } from '@fuels/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ViewModes } from './constants';

export function ViewMode({ mode }: { mode: ViewModes }) {
  const router = useRouter();
  const isMounted = useRef(false);

  if (!isMounted.current) {
    router.prefetch(`./${ViewModes.Simple}`);
    router.prefetch(`./${ViewModes.Advanced}`);
  }

  useEffect(() => {
    isMounted.current = true;
  }, []);

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
