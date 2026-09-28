import { BridgePageShell } from '~/systems/Bridge/components/BridgePageShell';
import { DEFAULT_WITHDRAW_DELAY } from '~/systems/Bridge/constants';
import { useWithdrawDelay } from '~portal/systems/Bridge/hooks/useWithdrawDelay';
import { BridgePage as PortalBridgePage } from '~portal/systems/Bridge/page-root';

export default function BridgePage() {
  const { timeToWithdrawFormatted } = useWithdrawDelay();
  const withdrawDelay = timeToWithdrawFormatted ?? DEFAULT_WITHDRAW_DELAY;

  return (
    <BridgePageShell withdrawDelay={withdrawDelay}>
      <PortalBridgePage />
    </BridgePageShell>
  );
}
