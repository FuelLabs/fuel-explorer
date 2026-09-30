import { Routes } from 'app-commons';
import type React from 'react';
import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BridgeFormSkeleton } from '~/systems/Bridge/components/BridgeFormSkeleton';
import { BridgePageShell } from '~/systems/Bridge/components/BridgePageShell';
import { DEFAULT_WITHDRAW_DELAY } from '~/systems/Bridge/constants';
import { WithdrawDelayProvider } from '~/systems/Bridge/withdrawDelay';

// Pulls in wagmi, viem and connectkit.
const BridgePanelPage = lazy(() => import('~/pages/BridgePanelPage'));

const PANEL_HEIGHT_KEY = 'fuel:bridge-panel-height';
// BridgeFormSkeleton's height, which is the form before a wallet connects.
const DEFAULT_PANEL_HEIGHT = 830;

function readPanelHeight() {
  try {
    const saved = Number(sessionStorage.getItem(PANEL_HEIGHT_KEY));
    return saved > 0 ? saved : DEFAULT_PANEL_HEIGHT;
  } catch {
    return DEFAULT_PANEL_HEIGHT;
  }
}

// Breaks out of the Layout column so the bridge grid can span the page.
// The child routes only match the URL; the panel renders here for both, so
// it stays mounted and the form and history animate into each other.
const BridgeLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isHistory = pathname.startsWith(Routes.bridgeHistory());
  const panel = useRef<HTMLDivElement>(null);
  const [withdrawDelay, setWithdrawDelay] = useState(DEFAULT_WITHDRAW_DELAY);
  const [panelHeight, setPanelHeight] = useState(readPanelHeight);

  // The form sets the panel height. History takes the same box and scrolls
  // its list inside it, so switching between them never moves the page.
  useLayoutEffect(() => {
    const el = panel.current;
    if (isHistory || !el) return;
    const observer = new ResizeObserver(() => {
      const height = Math.round(el.getBoundingClientRect().height);
      if (!height) return;
      setPanelHeight(height);
      try {
        sessionStorage.setItem(PANEL_HEIGHT_KEY, String(height));
      } catch {}
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHistory]);

  return (
    <div className="relative -mt-8 pt-8 left-1/2 w-screen -translate-x-1/2">
      <WithdrawDelayProvider value={setWithdrawDelay}>
        <BridgePageShell withdrawDelay={withdrawDelay}>
          <div
            ref={panel}
            className="flex flex-col"
            style={isHistory ? { height: panelHeight } : undefined}
          >
            <Suspense fallback={<BridgeFormSkeleton />}>
              <BridgePanelPage />
            </Suspense>
          </div>
        </BridgePageShell>
      </WithdrawDelayProvider>
    </div>
  );
};

export default BridgeLayout;
