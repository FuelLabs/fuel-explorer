'use client';
import { useParams, useRouter } from 'next/navigation';

import type { ViewModes } from '../components/ViewMode/ViewMode';

export function useViewMode(baseUrl?: string) {
  const { mode: viewMode } = useParams<{
    mode: ViewModes;
  }>();
  const router = useRouter();

  function setViewMode(mode: ViewModes) {
    router.push(`${baseUrl || ''}/${mode}`);
  }

  return { viewMode, setViewMode };
}
