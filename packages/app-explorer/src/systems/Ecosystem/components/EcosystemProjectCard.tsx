import { IconArrowUpRight } from '@fuels/ui';
import { getProjectImage } from 'app-commons';
import { type CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import type { Project } from '~/types/ecosystem';
import { projectSlug } from '../utils/projectSlug';

// "Fuel Wallet" -> "WA", "Spectrum Nodes" -> "SN", "Moor" -> "MO".
function monogram(name: string) {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2);
  if (words[0].toLowerCase() === 'fuel') return words[1].slice(0, 2);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

export function EcosystemLogo({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const classes = styles();
  const [failed, setFailed] = useState(!project.image);

  return (
    <div className={classes.logo({ className })}>
      {failed ? (
        <span aria-hidden className={classes.monogram()}>
          {monogram(project.name)}
        </span>
      ) : (
        <img
          src={getProjectImage(project.image ?? '')}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          className={classes.image()}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

type EcosystemProjectCardProps = {
  project: Project;
  /** Set to rise in after this many ms. Unset fades in without a delay. */
  enterDelay?: number;
};

export function EcosystemProjectCard({
  project,
  enterDelay,
}: EcosystemProjectCardProps) {
  // Read once: a card keeps the entrance it mounted with, so a later change of
  // props never swaps the animation and replays it.
  const [enter] = useState(enterDelay);
  const classes = styles({ cascade: enter !== undefined });

  return (
    <Link
      to={`/ecosystem/${projectSlug(project)}`}
      className={classes.root()}
      style={
        enter
          ? ({ '--fuel-enter-delay': `${enter}ms` } as CSSProperties)
          : undefined
      }
    >
      <EcosystemLogo project={project} />
      <div className={classes.body()}>
        <h3 className={classes.name()}>{project.name}</h3>
        <p className={classes.description()}>
          {project.tagline ?? project.description}
        </p>
      </div>
      <IconArrowUpRight
        size={16}
        stroke={1.5}
        aria-hidden
        className={classes.arrow()}
      />
    </Link>
  );
}

const styles = tv({
  slots: {
    root: [
      'group relative flex min-h-[84px] min-w-0 items-center gap-4 px-4 py-3 no-underline',
      'border-r border-b border-[var(--fuel-line)] bg-[var(--fuel-background)]',
      'transition-colors [transition-duration:200ms] hover:bg-[var(--fuel-muted)] motion-reduce:transition-none',
      'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-primary)]',
      'tablet:min-h-[112px] tablet:px-5 tablet:py-4',
    ],
    logo: [
      'grid size-12 shrink-0 place-items-center overflow-hidden rounded-[8px] shadow-sm',
      'border border-[var(--fuel-line)] bg-[var(--fuel-background)] tablet:size-16',
    ],
    image: 'size-full object-cover',
    monogram:
      'font-mono text-[16px] uppercase tracking-[0.04em] text-[var(--fuel-element-low-em)] tablet:text-[18px]',
    body: 'min-w-0 flex-1',
    name: 'm-0 truncate font-medium text-heading text-[16px] leading-[24px]',
    description:
      'm-0 mt-0.5 line-clamp-2 text-[14px] leading-[20px] text-[var(--fuel-element-low-em)]',
    arrow: [
      'ml-auto shrink-0 text-[var(--fuel-element-low-em)]',
      'transition-[color,transform] duration-200 ease-out group-hover:text-[var(--fuel-primary)] group-focus-visible:text-[var(--fuel-primary)]',
      'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5',
      'motion-reduce:transition-none motion-reduce:transform-none',
    ],
  },
  variants: {
    cascade: {
      true: { root: 'fuel-rise' },
      false: { root: 'fuel-appear' },
    },
  },
});
