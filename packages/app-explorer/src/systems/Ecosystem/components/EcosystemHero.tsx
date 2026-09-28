import { Button, DitherImage, GridFrame } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { START_BUILDING_URL } from '../constants';

export function EcosystemHero() {
  const classes = styles();

  return (
    <GridFrame className="grid-cols-1">
      <section className={classes.cell()}>
        <div className="fuel-dither-art fuel-dither-accent">
          <DitherImage
            src="/illustrations/bridge-background.jpg"
            cell={1}
            brightness={0.09}
          />
        </div>
        <div className={classes.content()}>
          <p className="fuel-eyebrow m-0 text-[var(--fuel-element-mid-em)]">
            Ecosystem
          </p>
          <h1 className={classes.title()}>Built on Fuel</h1>
          <p className={classes.lead()}>
            Apps, wallets and infrastructure live on the fastest execution
            layer.
          </p>
          <Button
            as="a"
            href={START_BUILDING_URL}
            target="_blank"
            rel="noreferrer"
            size="3"
            color="gray"
          >
            Start building
          </Button>
        </div>
      </section>
    </GridFrame>
  );
}

const styles = tv({
  slots: {
    cell: 'fuel-edge fuel-illustrated relative overflow-hidden px-6 py-16 tablet:py-24',
    content: 'relative flex flex-col items-center gap-4 text-center',
    title: [
      'm-0 font-medium uppercase text-heading',
      'text-[48px] leading-[48px] tracking-[-1.92px]',
      'tablet:text-[72px] tablet:leading-[72px] tablet:tracking-[-3.68px]',
    ],
    lead: 'm-0 mb-2 max-w-[480px] text-[18px] leading-[22px] tracking-[-0.18px] text-[var(--fuel-element-mid-em)]',
  },
});
