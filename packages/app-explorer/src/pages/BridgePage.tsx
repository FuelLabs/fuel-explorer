import { DitherImage, GridFrame } from '@fuels/ui';
import { BridgeFaq } from '~/systems/Bridge/components/BridgeFaq';
import { BridgeHowItWorks } from '~/systems/Bridge/components/BridgeHowItWorks';
import { BridgePageHeader } from '~/systems/Bridge/components/BridgePageHeader';
import { DEFAULT_WITHDRAW_DELAY } from '~/systems/Bridge/constants';
import { useWithdrawDelay } from '~portal/systems/Bridge/hooks/useWithdrawDelay';
import { BridgePage as PortalBridgePage } from '~portal/systems/Bridge/page-root';

export default function BridgePage() {
  const { timeToWithdrawFormatted } = useWithdrawDelay();
  const withdrawDelay = timeToWithdrawFormatted ?? DEFAULT_WITHDRAW_DELAY;

  return (
    // Cancels the Layout padding so the frame meets the navbar and the footer.
    <div className="-mt-8 -mb-10 laptop:-mb-[72px]">
      <GridFrame className="fuel-page border-t-0 grid-cols-1 min-[720px]:grid-cols-2 min-[1200px]:grid-cols-[1fr_552px_1fr]">
        <BridgePageHeader />
        <BridgeHowItWorks withdrawDelay={withdrawDelay} />
        <div className="fuel-edge fuel-tool-cell relative col-span-full order-[-1] px-4 py-6 min-[720px]:p-12 min-[1200px]:order-none min-[1200px]:col-span-1">
          <div className="fuel-dither-art">
            <DitherImage
              src="/illustrations/bridge-background.jpg"
              cell={1}
              brightness={0.09}
              cellMotion={2}
            />
          </div>
          <div className="relative">
            <PortalBridgePage />
          </div>
        </div>
        <BridgeFaq withdrawDelay={withdrawDelay} />
      </GridFrame>
    </div>
  );
}
