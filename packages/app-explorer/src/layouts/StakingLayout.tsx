import { Button, GridFrame } from '@fuels/ui';
import { BridgePausedBanner } from 'app-commons';
import { Outlet, useLocation } from 'react-router-dom';
import { ToolDitherCell } from '~/systems/Core/components/ToolPage/ToolDitherCell';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { VerifySelectedChainDialog } from '~/systems/Core/components/VerifySelectedChainDialog';
import {
  RIG_URL,
  STAKING_DOCS_URL,
  STAKING_FAQ,
  STAKING_STEPS,
} from '~/systems/Staking/constants/page';
import { AprBadge } from '~staking/systems/Staking/components/AprBadge/AprBadge';
import { StakingTabs } from '~staking/systems/Staking/components/StakingTabs/StakingTabs';

export default function StakingLayout() {
  const location = useLocation();

  // Check if we're on the Ethereum staking tab (L1)
  const isEthereumStaking = location.pathname.includes('/on-ethereum');

  return (
    <>
      <VerifySelectedChainDialog />
      <GridFrame className="grid-cols-1">
        <ToolPageHeader
          badge={isEthereumStaking && <AprBadge />}
          title="Help secure the Fuel network"
          lead="Delegate your tokens to Fuel validators, or liquid stake through The Rig on Ignition."
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
                Read docs
              </Button>
              <Button
                as="a"
                href={RIG_URL}
                target="_blank"
                rel="noreferrer"
                size="3"
                color="gray"
              >
                Open The Rig
              </Button>
            </>
          }
        />
        <ToolDitherCell
          src="/illustrations/bridge-background.jpg"
          className="col-span-full px-4 py-6 min-[720px]:px-8 min-[720px]:py-8"
        >
          <BridgePausedBanner />
          <StakingTabs />
          <Outlet />
        </ToolDitherCell>
        <ToolSteps title="How staking works" steps={STAKING_STEPS} />
        <ToolFaq
          items={STAKING_FAQ}
          docsLabel="Fuel docs"
          docsUrl={STAKING_DOCS_URL}
        />
      </GridFrame>
    </>
  );
}
