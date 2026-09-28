import { SectionTitle } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import type { EcosystemGroup } from '../utils/groupProjects';
import { EcosystemProjectCard } from './EcosystemProjectCard';

export function EcosystemSection({ section, projects }: EcosystemGroup) {
  const classes = styles();

  return (
    <section aria-labelledby={`ecosystem-${section.id}`}>
      <SectionTitle as="p">{section.eyebrow}</SectionTitle>
      <h2 id={`ecosystem-${section.id}`} className={classes.title()}>
        {section.title}
        <span className={classes.count()}>
          /{String(projects.length).padStart(2, '0')}
        </span>
      </h2>
      <p className={classes.lead()}>{section.lead}</p>
      <div className={classes.grid()}>
        {projects.map((project) => (
          <EcosystemProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

const styles = tv({
  slots: {
    title: [
      'mt-3 mb-2 flex items-baseline gap-2 font-medium text-heading',
      'text-[28px] leading-[32px] tracking-[-1.12px]',
    ],
    count: 'fuel-label tracking-[0.6px]',
    lead: 'm-0 mb-6 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]',
    grid: [
      'grid grid-cols-1 min-[720px]:grid-cols-2 desktop:grid-cols-3',
      'border-t border-l border-[var(--fuel-line)]',
    ],
  },
});
