import { tv } from 'tailwind-variants';

export type ToolStep = {
  title: string;
  description: string;
};

type ToolStepsProps = {
  title: string;
  /** One sentence under the title, before the numbered steps. */
  lead?: string;
  steps: ToolStep[];
  /** A warning line under the steps. */
  note?: string;
};

export function ToolSteps({ title, lead, steps, note }: ToolStepsProps) {
  const classes = styles();

  return (
    <section className={classes.root()}>
      <h2 className={classes.title()}>{title}</h2>
      {lead && <p className={classes.lead()}>{lead}</p>}
      <ol className={classes.steps()}>
        {steps.map((step, index) => (
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
      {note && (
        <p className={classes.note()}>
          <span aria-hidden className={classes.noteSquare()} />
          {note}
        </p>
      )}
    </section>
  );
}

const styles = tv({
  slots: {
    root: 'fuel-edge p-6 tablet:p-10',
    title:
      'm-0 mb-6 font-medium text-heading text-[28px] leading-[32px] tracking-[-1.12px]',
    lead: 'm-0 -mt-2 mb-6 max-w-[560px] text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]',
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
