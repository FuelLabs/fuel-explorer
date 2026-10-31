import { Button, GridFrame, IconChevronLeft, Square, cx } from '@fuels/ui';
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

// The same dither the staking lanes use, kept to the top-left and bottom-right
// corners so the form stays on a plain field. -z-10 inside the isolated cell
// paints it above the cell background and below the form. It shows only on
// desktop with the board collapsed: narrower, the form covers the corners.
const FORM_ART = '/illustrations/liquid-dither-poster.webp';
const FORM_ART_CLASS = [
  'pointer-events-none absolute inset-0 -z-10 hidden size-full object-cover [image-rendering:pixelated] desktop:block',
  'transition-opacity',
  'invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen dark:brightness-75',
  '[mask-image:radial-gradient(ellipse_47%_90%_at_0%_0%,black_26%,transparent_72%),radial-gradient(ellipse_47%_90%_at_100%_100%,black_26%,transparent_72%)]',
].join(' ');

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
          <div className="fuel-cell fuel-tool-cell fuel-illustrated isolate flex min-w-0 flex-col overflow-hidden bg-[var(--fuel-background)] px-6 py-8 tablet:px-10 desktop:flex-1">
            <img
              src={FORM_ART}
              alt=""
              className={cx(
                FORM_ART_CLASS,
                SLIDE,
                expanded ? 'opacity-0' : 'opacity-40',
              )}
            />
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
                'transition-[opacity,visibility] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--fuel-focus)]',
                SLIDE,
                expanded && 'invisible opacity-0',
              )}
            >
              <IconChevronLeft size={16} aria-hidden />
              {count > 0 && (
                <span className="flex flex-col items-center gap-2">
                  <Square />
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
