import { Button } from '@fuels/ui';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import type { Project } from '~/types/ecosystem';
import { prefersReducedMotion } from '../utils/prefersReducedMotion';
import { projectSlug } from '../utils/projectSlug';
import { EcosystemLogo } from './EcosystemProjectCard';

const POSTER = '/illustrations/o2-turbo-card.jpg';
const VIDEO = '/illustrations/o2-turbo.mp4';

export function EcosystemSpotlight({ project }: { project: Project }) {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <section
      className={classes.root()}
      style={{ '--fuel-enter-delay': '160ms' } as CSSProperties}
    >
      <div className={classes.copy()}>
        <div>
          <div className="flex items-center gap-3">
            <EcosystemLogo project={project} className={classes.logo()} />
            <p className={classes.name()}>{project.name}</p>
          </div>
          <h2 className={classes.title()}>{t('ecosystem.spotlight.title')}</h2>
          <p className={classes.lead()}>{t('ecosystem.spotlight.lead')}</p>
        </div>
        <div className={classes.actions()}>
          <Button
            as="a"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            size="3"
          >
            {t('ecosystem.spotlight.cta')}
          </Button>
          <Link
            to={`/ecosystem/${projectSlug(project)}`}
            className={classes.viewLink()}
          >
            {t('ecosystem.spotlight.view_project')}
          </Link>
        </div>
      </div>
      <div className={classes.media()}>
        {prefersReducedMotion() ? (
          <img
            src={POSTER}
            alt={t('ecosystem.spotlight.image_alt', { name: project.name })}
            loading="lazy"
            className={classes.mediaFill()}
          />
        ) : (
          <video
            src={VIDEO}
            poster={POSTER}
            aria-label={t('ecosystem.spotlight.image_alt', {
              name: project.name,
            })}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={classes.mediaFill()}
          />
        )}
      </div>
    </section>
  );
}

const styles = tv({
  slots: {
    root: 'fuel-rise grid border border-[var(--fuel-line)] bg-[var(--fuel-stone-950)] md:grid-cols-2',
    copy: [
      'flex flex-col p-6 tablet:p-8 md:justify-between md:p-10',
      'border-b border-white/10 md:border-r md:border-b-0',
    ],
    logo: 'size-10 border-white/10',
    name: 'm-0 min-w-0 truncate font-medium text-[14px] leading-[20px] text-white',
    title: [
      'm-0 mt-6 font-medium text-white leading-[1.12] tracking-tight',
      'text-[26px] tablet:mt-8 tablet:text-[32px]',
    ],
    lead: 'm-0 mt-4 max-w-[46ch] text-[14px] leading-[24px] text-[var(--fuel-stone-400)] tablet:text-[16px] tablet:leading-[28px]',
    actions: 'mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-12',
    viewLink: [
      'fuel-eyebrow shrink-0 text-[11px] tracking-[0.08em] text-[var(--fuel-stone-400)] no-underline',
      'transition-colors duration-200 hover:text-[var(--fuel-primary)] focus-visible:text-[var(--fuel-primary)] motion-reduce:transition-none',
    ],
    media:
      'relative order-first aspect-video overflow-hidden bg-black md:order-none md:aspect-auto md:min-h-[320px]',
    mediaFill: 'absolute inset-0 size-full object-contain',
  },
});
