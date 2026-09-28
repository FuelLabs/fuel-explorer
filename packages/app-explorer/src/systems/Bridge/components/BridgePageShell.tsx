import { Button, GridFrame } from '@fuels/ui';
import { Routes } from 'app-commons';
import type { ReactNode } from 'react';
import { ToolDitherCell } from '~/systems/Core/components/ToolPage/ToolDitherCell';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolPageHeader } from '~/systems/Core/components/ToolPage/ToolPageHeader';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { BRIDGE_DOCS_URL, BRIDGE_STEPS, getBridgeFaq } from '../constants';

type BridgePageShellProps = {
  withdrawDelay: string;
  children: ReactNode;
};

// Free of wallet code, so it can also render as the lazy page's fallback.
export function BridgePageShell({
  withdrawDelay,
  children,
}: BridgePageShellProps) {
  return (
    <div className="mt-12 -mb-10 laptop:-mb-[72px]">
      <GridFrame className="fuel-page border-t-0 grid-cols-1 min-[720px]:grid-cols-2">
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
          className="order-[-1] px-4 py-6 min-[720px]:order-none min-[720px]:p-12"
        >
          {children}
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
