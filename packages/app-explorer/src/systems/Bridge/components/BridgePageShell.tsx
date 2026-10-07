import { Button, GridFrame, IconChevronLeft, cx } from '@fuels/ui';
import { type ReactNode, Suspense, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { BRIDGE_DOCS_URL } from '../constants';

export type TransfersRailProps = {
  onCollapse: () => void;
  onCountChange: (count: number) => void;
};

type BridgePageShellProps = {
  board: (rail: TransfersRailProps) => ReactNode;
  children: ReactNode;
};

// The withdrawal time is not asked here: the form states it above the button.
function BridgeFaq() {
  const { t } = useTranslation('bridgeGuide');
  const faq = [
    {
      question: t('faq.assets.question'),
      answer: t('faq.assets.answer'),
    },
    {
      question: t('faq.faster.question'),
      answer: t('faq.faster.answer'),
    },
    {
      question: t('faq.history.question'),
      answer: t('faq.history.answer'),
    },
    {
      question: t('faq.cancel.question'),
      answer: t('faq.cancel.answer'),
    },
  ];

  return <ToolFaq items={faq} />;
}

// Easing shared with the design system's entrances.
const SLIDE =
  'duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

// On desktop the transfers board waits as a 56px rail beside the form and
// slides open to the full column. It opens by itself the first time a transfer
// is in progress, unless the reader already toggled it. Below desktop width it
// stacks under the form, always open; the FAQ stays last.
export function BridgePageShell({ board, children }: BridgePageShellProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(0);
  const toggled = useRef(false);

  const toggle = useCallback((next: boolean) => {
    toggled.current = true;
    setExpanded(next);
  }, []);

  const onCountChange = useCallback((next: number) => {
    setCount(next);
    if (next > 0 && !toggled.current) setExpanded(true);
  }, []);

  const onCollapse = useCallback(() => toggle(false), [toggle]);

  return (
    <>
      <ToolPageHeader
        title={t('bridge.title')}
        actions={
          <Button
            as="a"
            href={BRIDGE_DOCS_URL}
            target="_blank"
            rel="noreferrer"
            size="3"
            color="gray"
            variant="soft"
          >
            {t('bridge.read_docs')}
          </Button>
        }
      />
      <GridFrame className="grid-cols-1">
        <div className="grid min-w-0 gap-px bg-[var(--fuel-line)] [container-type:inline-size] desktop:flex">
          <div className="fuel-edge fuel-tool-cell flex min-w-0 flex-col bg-[var(--fuel-background)] px-6 py-8 tablet:px-10 desktop:flex-1">
            {children}
          </div>
          <div
            className={cx(
              'relative min-w-0 overflow-hidden bg-[var(--fuel-background)]',
              'desktop:flex-none desktop:transition-[flex-basis]',
              SLIDE,
              expanded
                ? 'desktop:basis-[calc(100cqw-561px)]'
                : 'desktop:basis-14',
            )}
          >
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="transfers-board"
              aria-label={t('bridge.board.expand')}
              onClick={() => toggle(true)}
              className={cx(
                'fuel-hover-fill absolute inset-0 z-10 hidden flex-col items-center gap-4 py-8 text-heading desktop:flex',
                'transition-[opacity,visibility] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-ring)]',
                SLIDE,
                expanded && 'invisible opacity-0',
              )}
            >
              <IconChevronLeft size={16} aria-hidden />
              {count > 0 && (
                <span className="flex flex-col items-center gap-2">
                  <span aria-hidden className="fuel-square" />
                  <span className="fuel-label text-heading">{count}</span>
                </span>
              )}
              <span className="fuel-label [writing-mode:vertical-rl]">
                {t('bridge.board.title')}
              </span>
            </button>
            <div
              id="transfers-board"
              className={cx(
                'desktop:w-[calc(100cqw-561px)] desktop:transition-[opacity,visibility]',
                SLIDE,
                !expanded && 'desktop:invisible desktop:opacity-0',
              )}
            >
              {board({ onCollapse, onCountChange })}
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <BridgeFaq />
        </Suspense>
      </GridFrame>
    </>
  );
}
