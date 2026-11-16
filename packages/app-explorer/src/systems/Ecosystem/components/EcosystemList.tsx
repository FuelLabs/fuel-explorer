import { FrameCorners } from '@fuels/ui';
import { useEffect, useRef } from 'react';
import type { Project } from '~/types/ecosystem';
import { EcosystemProjectCard } from './EcosystemProjectCard';

// Stagger covers the first row of cards a reader sees: 11 steps of 30ms keep
// the whole cascade at 330ms however long the list is.
const STAGGER_STEP_MS = 30;
const STAGGER_MAX_INDEX = 11;

type EcosystemListProps = {
  projects: Project[];
  /** Cascade the cards in when the list mounts. Cards that join later fade in alone. */
  stagger?: boolean;
};

// Cards draw their right and bottom lines; the grid draws the top and left.
export function EcosystemList({
  projects,
  stagger = true,
}: EcosystemListProps) {
  // Only the list's first render cascades. Cards that mount while the reader
  // types arrive with a short fade, and cards that stay never replay.
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);
  const cascade = stagger && !mounted.current;

  return (
    // The frame keeps its own border, so a short last row still closes. The grid
    // reaches 1px under the right and bottom border, where the card lines land on it.
    <div className="relative border border-[var(--fuel-line)]">
      <FrameCorners />
      <div className="-mr-px -mb-px grid grid-cols-1 tablet:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4">
        {projects.map((project, index) => (
          <EcosystemProjectCard
            key={project.name}
            project={project}
            enterDelay={
              cascade
                ? Math.min(index, STAGGER_MAX_INDEX) * STAGGER_STEP_MS
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
