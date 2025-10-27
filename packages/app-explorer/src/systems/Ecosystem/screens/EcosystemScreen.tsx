import { EcosystemPage } from 'app-portal';
import type { Project } from '~portal/systems/Ecosystem/types';

interface EcosystemPageProps {
  initialProjects: Project[];
  initialTags: string[];
  search?: string;
  tag?: string;
  liveOnly?: boolean;
}

export default function EcosystemScreen({
  initialProjects,
  initialTags,
  search,
  tag,
  liveOnly,
}: EcosystemPageProps) {
  return (
    <EcosystemPage
      initialProjects={initialProjects}
      initialTags={initialTags}
      search={search}
      tag={tag}
      liveOnly={liveOnly}
    />
  );
}
