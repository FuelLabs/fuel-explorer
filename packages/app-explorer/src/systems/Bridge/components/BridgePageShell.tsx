import { GridFrame } from '@fuels/ui';
import { type ReactNode, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { BRIDGE_DOCS_URL } from '../constants';

type BridgePageShellProps = {
  withdrawDelay: string;
  children: ReactNode;
};

function BridgeGuide({ withdrawDelay }: { withdrawDelay: string }) {
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
    <>
      <ToolSteps
        title={t('title')}
        lead={t('lead')}
        steps={steps}
        note={t('withdraw_note', { delay: withdrawDelay })}
      />
      <ToolFaq items={faq} docsLabel={t('docs')} docsUrl={BRIDGE_DOCS_URL} />
    </>
  );
}

// The form is the page. The explanation sits under it, the same way staking
// puts "How staking works" under the stake panel.
export function BridgePageShell({
  withdrawDelay,
  children,
}: BridgePageShellProps) {
  return (
    <GridFrame className="grid-cols-1">
      {children}
      <Suspense fallback={null}>
        <BridgeGuide withdrawDelay={withdrawDelay} />
      </Suspense>
    </GridFrame>
  );
}
