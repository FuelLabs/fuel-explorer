import { IconArrowUpRight } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';

export type ToolFaqItem = {
  question: string;
  answer: string;
};

type ToolFaqProps = {
  items: ToolFaqItem[];
  openFirst?: boolean;
  docsLabel: string;
  docsUrl: string;
};

export function ToolFaq({
  items,
  openFirst = true,
  docsLabel,
  docsUrl,
}: ToolFaqProps) {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <section className={classes.root()}>
      <h2 className={classes.title()}>{t('common.questions')}</h2>
      <div className={classes.list()}>
        {items.map((item, index) => (
          <details
            key={item.question}
            open={openFirst && index === 0}
            className={classes.item()}
          >
            <summary className={classes.question()}>
              {item.question}
              <span aria-hidden className={classes.toggle()}>
                +
              </span>
            </summary>
            <p className={classes.answer()}>{item.answer}</p>
          </details>
        ))}
      </div>
      <a
        href={docsUrl}
        target="_blank"
        rel="noreferrer"
        className={classes.docsLink()}
      >
        {docsLabel}
        <IconArrowUpRight size={14} stroke={1.5} />
      </a>
    </section>
  );
}

const styles = tv({
  slots: {
    root: 'fuel-edge col-span-full p-6 tablet:p-10',
    title:
      'm-0 mb-6 font-medium text-heading text-[28px] leading-[32px] tracking-[-1.12px]',
    list: 'border-t border-[var(--fuel-border)]',
    item: 'group border-b border-[var(--fuel-border)]',
    question: [
      'flex cursor-pointer list-none items-center justify-between gap-4 py-[18px]',
      'font-medium text-heading text-[16px] leading-[20px] tracking-[-0.32px]',
      '[&::-webkit-details-marker]:hidden',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fuel-element-high-em)]',
    ],
    toggle: [
      'font-mono text-[18px] leading-none text-[var(--fuel-element-low-em)]',
      'transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none',
    ],
    answer:
      'm-0 mb-[18px] pr-8 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]',
    docsLink: [
      'fuel-eyebrow mt-6 inline-flex items-center gap-2 text-[14px] no-underline text-heading',
      'transition-colors duration-300 hover:text-[var(--fuel-element-low-em)]',
    ],
  },
});
