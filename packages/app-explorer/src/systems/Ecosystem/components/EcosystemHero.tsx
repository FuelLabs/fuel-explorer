import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { EcosystemCorners } from './EcosystemCorners';
import { EcosystemVideo } from './EcosystemVideo';

// White dots on black. Screen blending drops the black onto the dark panel.
const VIDEO = '/illustrations/liquid-dither.mp4';
const POSTER = '/illustrations/liquid-dither-poster.webp';

export function EcosystemHero() {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <section className={classes.root()}>
      <EcosystemCorners />
      <EcosystemVideo
        eager
        src={VIDEO}
        poster={POSTER}
        className={classes.art()}
      />
      <header className={classes.content()}>
        <p className={classes.eyebrow()}>{t('ecosystem.eyebrow')}</p>
        <h1 className={classes.title()}>{t('ecosystem.built_on_fuel')}</h1>
        <p className={classes.lead()}>{t('ecosystem.lead')}</p>
      </header>
    </section>
  );
}

const styles = tv({
  slots: {
    root: 'relative isolate border border-[var(--fuel-line)] bg-[var(--fuel-stone-950)]',
    // One video fills the panel and a mask keeps two corner patches of it.
    art: [
      'pointer-events-none absolute inset-0 z-0 size-full object-cover opacity-40',
      'mix-blend-screen brightness-75 [image-rendering:pixelated]',
      '[mask-image:radial-gradient(ellipse_47%_58%_at_0%_0%,black_26%,transparent_72%),radial-gradient(ellipse_47%_58%_at_100%_100%,black_26%,transparent_72%)]',
    ],
    content: [
      'relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center justify-center text-center',
      'px-4 py-14 tablet:px-10 tablet:py-16 md:py-20',
    ],
    eyebrow: 'fuel-eyebrow m-0 mb-3 text-[var(--fuel-stone-400)]',
    title: [
      'm-0 max-w-[20ch] font-medium uppercase leading-none text-white',
      'text-[32px] tablet:text-[48px]',
    ],
    lead: 'm-0 mt-3 max-w-[520px] text-[14px] leading-[24px] text-[var(--fuel-stone-400)] tablet:mt-4 tablet:text-[16px]',
  },
});
