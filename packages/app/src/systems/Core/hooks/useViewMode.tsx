'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { ViewModes } from '../components/ViewMode/ViewMode';

export function useViewMode() {
  const query = useSearchParams();
  const viewMode = (query.get('view') || ViewModes.Simple) as ViewModes;
  const router = useRouter();

  function setViewMode(mode: ViewModes) {
    router.push(`?view=${mode}`);
  }

  return { viewMode, setViewMode };
}
