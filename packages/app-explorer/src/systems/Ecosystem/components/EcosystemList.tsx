import type { Project } from '~/types/ecosystem';
import { EcosystemCorners } from './EcosystemCorners';
import { EcosystemProjectCard } from './EcosystemProjectCard';

// Cards draw their right and bottom lines; the grid draws the top and left.
export function EcosystemList({ projects }: { projects: Project[] }) {
  return (
    <div className="relative">
      <EcosystemCorners />
      <div className="grid grid-cols-1 border-t border-l border-[var(--fuel-line)] tablet:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4">
        {projects.map((project) => (
          <EcosystemProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
