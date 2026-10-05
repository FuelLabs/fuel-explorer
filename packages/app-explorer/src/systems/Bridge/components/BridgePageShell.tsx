import { Button, GridFrame } from '@fuels/ui';
import { type ReactNode, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { BRIDGE_DOCS_URL } from '../constants';

type BridgePageShellProps = {
  withdrawDelay: string;
  board: ReactNode;
  children: ReactNode;
};

function BridgeFaq({ withdrawDelay }: { withdrawDelay: string }) {
  const { t } = useTranslation('bridgeGuide');
  const faq = [
    {
      question: t('faq.duration.question'),
      answer: t('faq.duration.answer', { delay: withdrawDelay }),
    },
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

  return (
    <ToolFaq items={faq} docsLabel={t('docs')} docsUrl={BRIDGE_DOCS_URL} />
  );
}

// The form, the transfers board and the steps share one block, so a pending
// transfer and the next step are visible while the next transfer is set up.
// Below desktop width everything stacks in that order; the FAQ stays last.
export function BridgePageShell({
  withdrawDelay,
  board,
  children,
}: BridgePageShellProps) {
  const { t } = useTranslation();

  return (
    <>
      <ToolPageHeader
        title={t('bridge.title')}
        lead={t('bridge.lead')}
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
        <div className="grid min-w-0 gap-px bg-[var(--fuel-line)] desktop:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
          <div className="fuel-edge fuel-tool-cell flex min-w-0 flex-col bg-[var(--fuel-background)] px-6 py-8 tablet:px-10">
            {children}
          </div>
          <div className="bg-[var(--fuel-background)]">{board}</div>
        </div>
        <Suspense fallback={null}>
          <BridgeFaq withdrawDelay={withdrawDelay} />
        </Suspense>
      </GridFrame>
    </>
  );
}
