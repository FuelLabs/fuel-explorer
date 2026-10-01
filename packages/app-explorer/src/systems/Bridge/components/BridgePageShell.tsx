import { Button, GridFrame } from '@fuels/ui';
import { type ReactNode, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { BRIDGE_DOCS_URL } from '../constants';

type BridgePageShellProps = {
  withdrawDelay: string;
  board: ReactNode;
  children: ReactNode;
};

function BridgeSteps({ withdrawDelay }: { withdrawDelay: string }) {
  const { t } = useTranslation('bridgeGuide');
  const steps = [
    {
      title: t('steps.connect.title'),
      description: t('steps.connect.description'),
    },
    {
      title: t('steps.amount.title'),
      description: t('steps.amount.description'),
    },
    {
      title: t('steps.confirm.title'),
      description: t('steps.confirm.description'),
    },
  ];

  return (
    <ToolSteps
      title={t('title')}
      lead={t('lead')}
      steps={steps}
      note={t('withdraw_note', { delay: withdrawDelay })}
    />
  );
}

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
    <GridFrame className="grid-cols-1">
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
      <div className="grid min-w-0 gap-px bg-[var(--fuel-line)] desktop:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
        <div className="fuel-edge fuel-tool-cell flex min-w-0 flex-col bg-[var(--fuel-background)] px-6 py-8 tablet:px-10">
          {children}
        </div>
        <div className="flex min-w-0 flex-col gap-px bg-[var(--fuel-line)]">
          <div className="bg-[var(--fuel-background)]">{board}</div>
          <div className="flex-1 bg-[var(--fuel-background)]">
            <Suspense fallback={null}>
              <BridgeSteps withdrawDelay={withdrawDelay} />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <BridgeFaq withdrawDelay={withdrawDelay} />
      </Suspense>
    </GridFrame>
  );
}
