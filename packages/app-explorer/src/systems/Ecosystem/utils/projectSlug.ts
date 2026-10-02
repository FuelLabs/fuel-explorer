import type { Project } from '~/types/ecosystem';

// Falls back to the name: "Microchain (formerly Mira)" -> "microchain-formerly-mira".
export function projectSlug(project: Pick<Project, 'name' | 'slug'>) {
  return (
    project.slug ??
    project.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}
