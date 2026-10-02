import { Button, GridFrame } from '@fuels/ui';
import { BridgePausedBanner } from 'app-commons';
import { AttentionBoard, StakingLanes, TabTransition } from 'app-staking';
import clsx from 'clsx';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useOutlet } from 'react-router-dom';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { VerifySelectedChainDialog } from '~/systems/Core/components/VerifySelectedChainDialog';
import { RIG_URL, STAKING_DOCS_URL } from '~/systems/Staking/constants/page';
import { AprBadge } from '~staking/systems/Staking/components/AprBadge/AprBadge';

// Header items that belong to one lane fade out instead of unmounting, so the
// header measures the same on both lanes. `invisible` also drops them from the
// tab order.
const LANE_ONLY = 'transition-[opacity,visibility] duration-200';
const LANE_HIDDEN = 'invisible opacity-0';

// The panel is one cell of the frame, so it redraws the 1px lines between its own cells.
const LANE_PANEL =
  'grid gap-px bg-[var(--fuel-line)] [&>*]:bg-[var(--fuel-background)]';

// The steps and three of the answers describe Ethereum delegation, so the Rig path
// keeps only its own question.
function StakingGuide({ ethereum }: { ethereum: boolean }) {
  const { t } = useTranslation('stakingGuide');
  const { t: tApp } = useTranslation();
  const steps = [
    {
      title: t('steps.connect.title'),
      description: t('steps.connect.description'),
    },
    {
      title: t('steps.validator.title'),
      description: t('steps.validator.description'),
    },
    {
      title: t('steps.stake.title'),
      description: t('steps.stake.description'),
    },
  ];
  const rigFaq = {
    question: t('faq.rig.question'),
    answer: t('faq.rig.answer'),
  };
  const faq = ethereum
    ? [
        rigFaq,
        {
          question: t('faq.unstake.question'),
          answer: t('faq.unstake.answer'),
        },
        {
          question: t('faq.position.question'),
          answer: t('faq.position.answer'),
        },
        { question: t('faq.apr.question'), answer: t('faq.apr.answer') },
      ]
    : [rigFaq];

  return (
    <>
      {ethereum && <ToolSteps title={t('title')} steps={steps} />}
      <ToolFaq
        items={faq}
        docsLabel={tApp('staking.docs')}
        docsUrl={STAKING_DOCS_URL}
      />
    </>
  );
}

export default function StakingLayout() {
  const { t } = useTranslation();
  const location = useLocation();

  // Check if we're on the Ethereum staking tab (L1)
  const isEthereumStaking = location.pathname.includes('/on-ethereum');
  // The element, not <Outlet />: a panel that is leaving keeps its own route.
  const outlet = useOutlet();

  return (
    <>
      <VerifySelectedChainDialog />
      <GridFrame className="grid-cols-1">
        <ToolPageHeader
          reserveBadge
          badge={
            <span
              aria-hidden={!isEthereumStaking}
              className={clsx(LANE_ONLY, !isEthereumStaking && LANE_HIDDEN)}
            >
              <AprBadge />
            </span>
          }
          title={t('staking.title')}
          lead={t('staking.lead')}
          actions={
            <>
              <Button
                as="a"
                href={STAKING_DOCS_URL}
                target="_blank"
                rel="noreferrer"
                size="3"
                color="gray"
                variant="soft"
              >
                {t('staking.read_docs')}
              </Button>
              {/* The Rig page carries its own Open The Rig button. The slot stays
                  so the header keeps its width and the text does not reflow. */}
              <Button
                as="a"
                href={RIG_URL}
                target="_blank"
                rel="noreferrer"
                size="3"
                color="gray"
                aria-hidden={!isEthereumStaking}
                className={clsx(LANE_ONLY, !isEthereumStaking && LANE_HIDDEN)}
              >
                {t('staking.open_rig')}
              </Button>
            </>
          }
        />
        <StakingLanes />
        <TabTransition
          panel={isEthereumStaking ? 'ethereum' : 'rig'}
          order={isEthereumStaking ? 1 : 0}
          panelClassName={LANE_PANEL}
        >
          <AttentionBoard />
          <div className="fuel-edge min-w-0">
            <div className="px-6 pt-6 tablet:px-10 empty:hidden">
              <BridgePausedBanner />
            </div>
            {outlet}
          </div>
          <Suspense fallback={null}>
            <StakingGuide ethereum={isEthereumStaking} />
          </Suspense>
        </TabTransition>
      </GridFrame>
    </>
  );
}
