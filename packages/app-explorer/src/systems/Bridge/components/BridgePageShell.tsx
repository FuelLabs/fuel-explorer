import { GridFrame } from '@fuels/ui';
import type { ReactNode } from 'react';
import { ToolDitherCell } from '~/systems/Core/components/ToolPage/ToolDitherCell';
import { ToolFaq } from '~/systems/Core/components/ToolPage/ToolFaq';
import { ToolSteps } from '~/systems/Core/components/ToolPage/ToolSteps';
import { BRIDGE_DOCS_URL, BRIDGE_STEPS, getBridgeFaq } from '../constants';

type BridgePageShellProps = {
  withdrawDelay: string;
  children: ReactNode;
};

// The form is the page. The explanation sits under it, the same way staking
// puts "How staking works" under the stake panel.
export function BridgePageShell({
  withdrawDelay,
  children,
}: BridgePageShellProps) {
  return (
    <GridFrame className="grid-cols-1">
      <ToolDitherCell
        src="/illustrations/bridge-background.jpg"
        className="col-span-full px-4 py-6 min-[720px]:px-8 min-[720px]:py-8"
      >
        {children}
      </ToolDitherCell>
      <ToolSteps
        title="How bridging works"
        lead="Deposit to Fuel Ignition or withdraw back to Ethereum. Connect both wallets, choose an asset and confirm."
        steps={BRIDGE_STEPS}
        note={`Withdrawals to Ethereum take up to ${withdrawDelay}`}
      />
      <ToolFaq
        items={getBridgeFaq(withdrawDelay)}
        docsLabel="Bridge docs"
        docsUrl={BRIDGE_DOCS_URL}
      />
    </GridFrame>
  );
}
