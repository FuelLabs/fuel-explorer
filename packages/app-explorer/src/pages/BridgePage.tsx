import { Button, GridFrame } from '@fuels/ui';
import { Routes } from 'app-commons';
import {
  BRIDGE_DOCS_URL,
  BRIDGE_STEPS,
  DEFAULT_WITHDRAW_DELAY,
  getBridgeFaq,
} from '~/systems/Bridge/constants';
import { ToolDitherCell } from '~/systems/Core/components/ToolPage/ToolDitherCell';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { useWithdrawDelay } from '~portal/systems/Bridge/hooks/useWithdrawDelay';
import { BridgePage as PortalBridgePage } from '~portal/systems/Bridge/page-root';

export default function BridgePage() {
  const { timeToWithdrawFormatted } = useWithdrawDelay();
  const withdrawDelay = timeToWithdrawFormatted ?? DEFAULT_WITHDRAW_DELAY;

  return (
    <div className="mt-8 -mb-10 laptop:-mb-[72px]">
      <GridFrame className="fuel-page border-t-0 grid-cols-1 min-[720px]:grid-cols-2 min-[1200px]:grid-cols-[1fr_552px_1fr]">
        <ToolPageHeader
          eyebrow="Bridge"
          title="Move assets between Ethereum and Fuel"
          lead="Deposit to Fuel Ignition or withdraw back to Ethereum. Connect both wallets, choose an asset and confirm."
          actions={
            <>
              <Button
                as="a"
                href={BRIDGE_DOCS_URL}
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
                href={Routes.bridgeHistory()}
                size="3"
                color="gray"
              >
                View history
              </Button>
            </>
          }
        />
        <ToolSteps
          title="How bridging works"
          steps={BRIDGE_STEPS}
          note={`Withdrawals to Ethereum take up to ${withdrawDelay}`}
        />
        <ToolDitherCell
          src="/illustrations/bridge-background.jpg"
          className="col-span-full order-[-1] px-4 py-6 min-[720px]:p-12 min-[1200px]:order-none min-[1200px]:col-span-1"
        >
          <PortalBridgePage />
        </ToolDitherCell>
        <ToolFaq
          items={getBridgeFaq(withdrawDelay)}
          docsLabel="Bridge docs"
          docsUrl={BRIDGE_DOCS_URL}
        />
      </GridFrame>
    </div>
  );
}
