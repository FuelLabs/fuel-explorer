import { tv } from 'tailwind-variants';
import { BRIDGE_STEPS } from '../constants';

export function BridgeHowItWorks({ withdrawDelay }: { withdrawDelay: string }) {
  const classes = styles();

  return (
    <section className={classes.root()}>
      <h2 className={classes.title()}>How bridging works</h2>
      <ol className={classes.steps()}>
        {BRIDGE_STEPS.map((step, index) => (
          <li key={step.title} className={classes.step()}>
            <span className={classes.number()}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className={classes.stepTitle()}>{step.title}</h3>
              <p className={classes.stepText()}>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className={classes.note()}>
        <span aria-hidden className={classes.noteSquare()} />
        Withdrawals to Ethereum take up to {withdrawDelay}
      </p>
    </section>
  );
}

const styles = tv({
  slots: {
    root: 'fuel-edge p-6 tablet:p-10',
    title:
      'm-0 mb-6 font-medium text-heading text-[28px] leading-[32px] tracking-[-1.12px]',
    steps: 'm-0 p-0 list-none',
    step: [
      'grid grid-cols-[40px_1fr] gap-2 py-5',
      'border-t border-[var(--fuel-border)] last:border-b',
    ],
    number: 'fuel-label pt-[5px]',
    stepTitle:
      'm-0 mb-1.5 font-medium text-heading text-[20px] leading-[24px] tracking-[-0.4px]',
    stepText:
      'm-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]',
    note: 'fuel-eyebrow mt-6 flex items-center gap-3 text-[var(--fuel-element-mid-em)]',
    noteSquare: 'size-2 shrink-0 bg-[var(--orange-10)]',
  },
});
