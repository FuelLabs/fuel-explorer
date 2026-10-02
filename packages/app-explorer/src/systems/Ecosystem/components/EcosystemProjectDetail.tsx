import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandX,
  LoadingBox,
} from '@fuels/ui';
import { getUrlHostName } from 'app-commons';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { cx } from '~/systems/Core/utils/cx';
import type { Project } from '~/types/ecosystem';
import type { EcosystemSection } from '../constants';
import { isSuiteProject } from '../utils/groupProjects';
import { EcosystemCorners } from './EcosystemCorners';
import { EcosystemList } from './EcosystemList';
import { EcosystemLogo } from './EcosystemProjectCard';
import { LogoDither } from './LogoDither';

const ART = '/illustrations/liquid-dither.webp';

type EcosystemProjectDetailProps = {
  project: Project;
  section: EcosystemSection;
  related: Project[];
};

export function EcosystemProjectDetail({
  project,
  section,
  related,
}: EcosystemProjectDetailProps) {
  const { t } = useTranslation('ecosystemProject');
  const { t: tApp } = useTranslation();
  const classes = styles();
  const isSuite = isSuiteProject(project);
  const collection = project.collection ?? (isSuite ? 'suite' : 'community');
  const about = project.about ?? [];
  const products = project.products ?? [];
  const sectionUrl = `/ecosystem?section=${section.id}`;
  const sectionLabel = tApp(`ecosystem.sections.${section.id}.eyebrow`);
  const host = project.url ? getUrlHostName(project.url) : '';
  const context = t(`context.${section.id}`, { name: project.name });
  const socials = [
    {
      url: project.twitter,
      label: t('on_x', { name: project.name }),
      Icon: IconBrandX,
    },
    {
      url: project.github,
      label: t('on_github', { name: project.name }),
      Icon: IconBrandGithub,
    },
    {
      url: project.discord,
      label: t('on_discord', { name: project.name }),
      Icon: IconBrandDiscord,
    },
  ].filter((social) => social.url);

  return (
    <div className={classes.page()}>
      <nav aria-label={t('breadcrumb')} className={classes.breadcrumb()}>
        <Link to="/ecosystem" className={classes.crumb()}>
          <IconArrowLeft size={16} aria-hidden /> {t('breadcrumb')}
        </Link>
        <span aria-hidden className="text-[var(--fuel-line)]">
          /
        </span>
        <Link to={sectionUrl} className={classes.crumb()}>
          {sectionLabel}
        </Link>
      </nav>

      <div className={classes.hero()}>
        <EcosystemCorners />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <img src={ART} alt="" className={classes.heroArt()} />
        </div>
        <div className={classes.split()}>
          <div className={classes.heroCopy()}>
            {isSuite && (
              <span className={classes.badge()}>{t('suite_badge')}</span>
            )}
            <h1 className={classes.heroTitle()}>{project.name}</h1>
            <p className={classes.heroLead()}>
              {project.tagline ?? project.description}
            </p>
          </div>
          <div className={classes.heroArtwork()}>
            <LogoDither project={project} />
            <EcosystemLogo project={project} className={classes.heroLogo()} />
          </div>
        </div>
      </div>

      <article className="relative mt-10 tablet:mt-12">
        <EcosystemCorners />
        <div
          className={cx(classes.split(), 'border border-[var(--fuel-line)]')}
        >
          <div className={classes.about()}>
            <h2 className={classes.label()}>
              {t('about', { name: project.name })}
            </h2>
            <p className={classes.aboutLead()}>
              {about.length ? project.description : context}
            </p>
            {about.length > 0 && (
              <>
                <div className={classes.paragraphs()}>
                  {about.map((paragraph) => (
                    <p key={paragraph} className="m-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className={classes.context()}>{context}</p>
              </>
            )}
          </div>
          <dl className={classes.facts()}>
            <Fact
              label={t('facts.category')}
              className="border-r border-b sm:border-r-0"
            >
              <Link to={sectionUrl} className={classes.factLink()}>
                {sectionLabel}
              </Link>
            </Fact>
            <Fact label={t('facts.collection')} className="border-b">
              {t(`collection.${collection}`)}
            </Fact>
            <Fact
              label={t('facts.network')}
              className="border-r sm:border-r-0 sm:border-b"
            >
              {t('network_fuel')}
            </Fact>
            <Fact label={t('facts.links')}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                {host ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.factLink()}
                  >
                    <span className="truncate">{host}</span>
                    <IconArrowUpRight
                      size={14}
                      aria-hidden
                      className="shrink-0 text-[var(--fuel-element-low-em)]"
                    />
                  </a>
                ) : (
                  <span className="truncate text-[var(--fuel-element-low-em)]">
                    {t('not_listed')}
                  </span>
                )}
                <div className="flex flex-wrap gap-2">
                  {socials.map(({ url, label, Icon }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={classes.social()}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </Fact>
          </dl>
        </div>
      </article>

      {products.length > 0 && (
        <div className="mt-10 flex flex-col gap-5 tablet:mt-12">
          <h2 className={classes.label()}>{t('ways_to_use')}</h2>
          <div className={classes.products()}>
            {products.map((product) => {
              const url = product.url ?? project.url;
              return (
                <a
                  key={product.name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.product()}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={classes.productName()}>{product.name}</h3>
                    <IconArrowUpRight
                      size={20}
                      aria-hidden
                      className={classes.productArrow()}
                    />
                  </div>
                  <p className={classes.productTagline()}>{product.tagline}</p>
                  <p className={classes.productText()}>{product.description}</p>
                  <span className={classes.productOpen()}>
                    {t('open_on', { host: getUrlHostName(url) })}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-12 flex flex-col gap-4 tablet:mt-16">
          <div className="flex items-end justify-between gap-4 px-7">
            <h2 className={classes.relatedTitle()}>
              {t('more_in', { category: sectionLabel })}
            </h2>
            <Link to={sectionUrl} className={classes.seeAll()}>
              {t('see_all')}
            </Link>
          </div>
          <EcosystemList projects={related} />
        </div>
      )}
    </div>
  );
}

function Fact({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx('min-w-0 border-[var(--fuel-line)] p-7', className)}>
      <dt className="fuel-eyebrow text-[12px] tracking-[0.08em] text-[var(--fuel-element-low-em)]">
        {label}
      </dt>
      <dd className="m-0 mt-3 truncate text-[16px] text-heading">{children}</dd>
    </div>
  );
}

export function EcosystemProjectNotFound() {
  const { t } = useTranslation('ecosystemProject');
  const classes = styles();

  return (
    <div className={cx(classes.page(), 'flex flex-col gap-6 py-24')}>
      <h1 className="m-0 font-medium text-heading text-[30px] leading-[36px] tracking-[-0.6px]">
        {t('not_found.title')}
      </h1>
      <Link
        to="/ecosystem"
        className={cx(classes.crumb(), classes.label(), 'w-fit')}
      >
        <IconArrowLeft size={16} aria-hidden /> {t('not_found.back')}
      </Link>
    </div>
  );
}

export function EcosystemProjectLoadError() {
  const { t } = useTranslation('ecosystemProject');
  const classes = styles();

  return (
    <div className={cx(classes.page(), 'flex flex-col gap-6 py-24')}>
      <h1 className="m-0 font-medium text-heading text-[30px] leading-[36px] tracking-[-0.6px]">
        {t('load_error.title')}
      </h1>
      <p className="m-0 text-[var(--red-11)]">{t('load_error.body')}</p>
      <Link
        to="/ecosystem"
        className={cx(classes.crumb(), classes.label(), 'w-fit')}
      >
        <IconArrowLeft size={16} aria-hidden /> {t('not_found.back')}
      </Link>
    </div>
  );
}

export function EcosystemProjectSkeleton() {
  const classes = styles();

  return (
    <div aria-hidden className={cx(classes.page(), 'flex flex-col gap-10')}>
      <LoadingBox className="mt-7 h-[280px] w-full" />
      <LoadingBox className="h-[360px] w-full" />
    </div>
  );
}

const styles = tv({
  slots: {
    page: 'mx-auto w-full max-w-[1240px]',
    breadcrumb: [
      'fuel-eyebrow mb-3 flex items-center gap-2 pl-2 text-[12px] tracking-[0.08em]',
      'text-[var(--fuel-element-low-em)] tablet:pl-3 desktop:mb-4 desktop:pl-4',
    ],
    crumb: [
      'flex items-center gap-2 no-underline text-[var(--fuel-element-low-em)] transition-colors hover:text-heading',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fuel-primary)]',
    ],
    hero: 'relative isolate border border-[var(--fuel-line)] bg-[var(--fuel-stone-950)]',
    heroArt: [
      'absolute top-0 left-0 h-[70%] w-[46%] object-cover opacity-20 tablet:opacity-30',
      'grayscale invert contrast-200 brightness-75 [image-rendering:pixelated]',
      '[mask-image:radial-gradient(ellipse_90%_90%_at_0%_0%,black_20%,transparent_70%)]',
    ],
    split:
      'relative z-10 grid sm:grid-cols-[minmax(0,1fr)_320px] md:grid-cols-[minmax(0,1fr)_400px]',
    heroCopy:
      'flex min-w-0 flex-col justify-center px-6 py-10 tablet:px-10 tablet:py-12 md:px-14',
    badge: [
      'fuel-eyebrow mb-6 w-fit rounded-full border border-[var(--fuel-stone-600)] px-3 py-1',
      'text-[12px] tracking-[0.08em] text-[var(--fuel-stone-400)]',
    ],
    heroTitle:
      'm-0 break-words font-medium uppercase leading-none text-white text-[40px]',
    heroLead:
      'm-0 mt-5 max-w-[560px] text-[16px] leading-[24px] text-[var(--fuel-stone-400)]',
    heroArtwork: [
      'relative grid min-h-[220px] place-items-center overflow-hidden tablet:min-h-[280px]',
      'border-t border-[var(--fuel-line)] sm:border-t-0 sm:border-l',
    ],
    heroLogo: 'relative size-24 tablet:size-32',
    label:
      'fuel-eyebrow m-0 text-[12px] tracking-[0.08em] text-[var(--fuel-element-low-em)]',
    about: 'flex flex-col gap-5 p-7 tablet:p-10 md:px-14',
    aboutLead: 'm-0 max-w-[640px] text-[24px] leading-[32px] text-heading',
    paragraphs:
      'flex max-w-[640px] flex-col gap-4 text-[16px] leading-[28px] text-[var(--fuel-element-mid-em)]',
    context: [
      'm-0 max-w-[640px] border-t border-[var(--fuel-line)] pt-5',
      'text-[14px] leading-[24px] text-[var(--fuel-element-low-em)]',
    ],
    facts: [
      'm-0 grid grid-cols-2 content-start sm:grid-cols-1',
      'border-t border-[var(--fuel-line)] sm:border-t-0 sm:border-l',
    ],
    factLink: [
      'inline-flex min-w-0 max-w-full items-center gap-1 text-heading underline underline-offset-4',
      'decoration-[var(--fuel-line)] hover:decoration-[var(--fuel-element-high-em)]',
    ],
    social: [
      'grid size-9 place-items-center border border-[var(--fuel-line)] text-[var(--fuel-element-low-em)]',
      'transition-colors duration-200 hover:border-[var(--fuel-element-high-em)] hover:text-heading motion-reduce:transition-none',
    ],
    products:
      'grid gap-px border border-[var(--fuel-line)] bg-[var(--fuel-line)] tablet:grid-cols-2',
    product: [
      'group relative flex flex-col gap-2 bg-[var(--fuel-background)] p-7 no-underline tablet:p-10',
      'transition-colors duration-200 hover:bg-[var(--fuel-muted)] motion-reduce:transition-none',
    ],
    productName: 'm-0 font-medium text-heading text-[20px] leading-[28px]',
    productArrow:
      'shrink-0 text-[var(--fuel-element-low-em)] transition-colors duration-200 group-hover:text-heading',
    productTagline:
      'fuel-eyebrow m-0 text-[11px] leading-[16px] tracking-[0.08em] text-[var(--fuel-element-low-em)]',
    productText:
      'm-0 text-[14px] leading-[24px] text-[var(--fuel-element-low-em)]',
    productOpen: [
      'fuel-eyebrow mt-auto pt-4 text-[11px] tracking-[0.08em] text-[var(--fuel-element-low-em)]',
      'transition-colors duration-200 group-hover:text-heading',
    ],
    relatedTitle: 'm-0 font-medium text-heading text-[24px] leading-[32px]',
    seeAll: [
      'text-[14px] text-[var(--fuel-element-low-em)] underline underline-offset-4',
      'decoration-[var(--fuel-line)] transition-colors hover:text-heading',
    ],
  },
});
