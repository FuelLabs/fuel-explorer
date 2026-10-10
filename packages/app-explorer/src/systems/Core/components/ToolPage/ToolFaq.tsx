import { IconPlus } from '@fuels/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';

export type ToolFaqItem = {
  question: string;
  answer: string;
};

type ToolFaqProps = {
  items: ToolFaqItem[];
};

// The open, hover and close motion lives in fuel-ds.css under `.fuel-faq`.
export function ToolFaq({ items }: ToolFaqProps) {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <section className={classes.root()}>
      <h2 className={classes.title()}>{t('common.questions')}</h2>
      <div className="fuel-faq">
        {items.map((item) => (
          <ToolFaqRow key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}

// A button and a grid row instead of <details>: a closing <details> hides its
// content at once, so the answer could not fold away.
function ToolFaqRow({ item }: { item: ToolFaqItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const classes = styles();

  return (
    <div className={classes.item()} data-open={open || undefined}>
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-question`}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen((value) => !value)}
          className={classes.question()}
        >
          <span aria-hidden className="fuel-square fuel-faq-marker" />
          <span className="fuel-faq-label">{item.question}</span>
          <IconPlus
            aria-hidden
            size={14}
            stroke={1.5}
            className="fuel-faq-toggle"
          />
        </button>
      </h3>
      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        className="fuel-faq-panel"
      >
        <div className="min-h-0 overflow-hidden">
          <p className={classes.answer()}>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

const styles = tv({
  slots: {
    root: 'fuel-edge col-span-full px-6 py-6 tablet:px-10 tablet:py-8',
    title:
      'fuel-label m-0 mb-3 text-[12px] leading-[18px] tracking-[0.6px] text-[var(--fuel-element-low-em)]',
    item: 'fuel-faq-item relative border-b border-[var(--fuel-border)] last:border-b-0',
    question: [
      'relative flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 py-3 text-left',
      'font-normal text-[14px] leading-[20px] tracking-[-0.14px]',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fuel-element-high-em)]',
    ],
    answer:
      'fuel-faq-answer m-0 mb-3 pl-4 pr-8 text-[14px] leading-[20px] tracking-[-0.14px] text-[var(--fuel-element-low-em)]',
  },
});
