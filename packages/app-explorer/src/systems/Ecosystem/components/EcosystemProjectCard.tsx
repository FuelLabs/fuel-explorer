import { IconArrowUpRight } from '@fuels/ui';
import { getProjectImage } from 'app-commons';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import type { Project } from '~/types/ecosystem';

export function EcosystemProjectCard({ project }: { project: Project }) {
  const classes = styles();
  const [imageFailed, setImageFailed] = useState(!project.image);

  return (
    <article className={classes.root()}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className={classes.link()}
      >
        <div className={classes.tile()}>
          {imageFailed ? (
            <span aria-hidden className={classes.initial()}>
              {project.name.charAt(0)}
            </span>
          ) : (
            <img
              src={getProjectImage(project.image ?? '')}
              alt=""
              width={160}
              height={160}
              loading="lazy"
              className={classes.image()}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className={classes.body()}>
          <IconArrowUpRight
            size={14}
            stroke={1.5}
            aria-hidden
            className={classes.arrow()}
          />
          <h3 className={classes.name()}>{project.name}</h3>
          <p className={classes.description()}>{project.description}</p>
        </div>
      </a>
    </article>
  );
}

const styles = tv({
  slots: {
    root: 'min-w-0 border-r border-b border-[var(--fuel-line)] bg-[var(--fuel-background)]',
    link: [
      'group grid h-full grid-cols-[112px_1fr] tablet:grid-cols-[144px_1fr] no-underline',
      'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-element-high-em)]',
    ],
    tile: 'grid aspect-square place-items-center overflow-hidden border-r border-[var(--fuel-line)] bg-[var(--fuel-card)]',
    image: 'h-full w-full object-cover',
    initial:
      'font-medium text-[40px] text-[var(--fuel-element-low-em)] uppercase',
    body: [
      'relative flex min-w-0 flex-col justify-center gap-1.5 py-4 pl-5 pr-8',
      'transition-colors duration-300 group-hover:bg-[var(--fuel-muted)]',
    ],
    arrow: 'absolute top-4 right-4 text-[var(--fuel-element-low-em)]',
    name: 'm-0 truncate font-medium text-heading text-[20px] leading-[24px] tracking-[-0.4px]',
    description:
      'm-0 line-clamp-2 text-[14px] leading-[18px] text-[var(--fuel-element-low-em)]',
  },
});
