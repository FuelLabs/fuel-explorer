import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  EcosystemProjectDetail,
  EcosystemProjectLoadError,
  EcosystemProjectNotFound,
  EcosystemProjectSkeleton,
} from '~/systems/Ecosystem/components/EcosystemProjectDetail';
import { useEcosystemProjects } from '~/systems/Ecosystem/hooks/useEcosystemProjects';
import {
  isSuiteProject,
  sectionForProject,
} from '~/systems/Ecosystem/utils/groupProjects';
import { projectSlug } from '~/systems/Ecosystem/utils/projectSlug';

const RELATED_LIMIT = 8;

function EcosystemProjectScreen() {
  const { slug } = useParams();
  // Every listed project, live or not, so links from ?liveOnly=off resolve.
  const { data, isLoading, isError } = useEcosystemProjects(false);
  const projects = data?.initialProjects ?? [];
  const project = projects.find((item) => projectSlug(item) === slug);

  if (isLoading) return <EcosystemProjectSkeleton />;
  // A failed request leaves no data, which is not the same as an unknown slug.
  if (!project) {
    return isError ? (
      <EcosystemProjectLoadError />
    ) : (
      <EcosystemProjectNotFound />
    );
  }

  const section = sectionForProject(project);
  const related = projects
    .filter(
      (item) => item !== project && sectionForProject(item).id === section.id,
    )
    .sort((a, b) => Number(isSuiteProject(b)) - Number(isSuiteProject(a)))
    .slice(0, RELATED_LIMIT);

  return (
    <EcosystemProjectDetail
      key={project.name}
      project={project}
      section={section}
      related={related}
    />
  );
}

export function EcosystemProjectPage() {
  return (
    <Suspense fallback={<EcosystemProjectSkeleton />}>
      <EcosystemProjectScreen />
    </Suspense>
  );
}
