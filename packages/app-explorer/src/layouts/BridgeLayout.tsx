import type React from 'react';
import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BridgeFormSkeleton } from '~/systems/Bridge/components/BridgeFormSkeleton';
import { BridgePageShell } from '~/systems/Bridge/components/BridgePageShell';
import { TransfersBoardSkeleton } from '~/systems/Bridge/components/TransfersBoardSkeleton';
import { isBridgeHistory } from '~portal/systems/Bridge/utils/isBridgeHistory';

// Pulls in wagmi, viem and connectkit.
const BridgePanelPage = lazy(() => import('~/pages/BridgePanelPage'));
// Reads the same bridge store, so it loads with the same chunk of dependencies.
const TransfersBoard = lazy(() =>
  import('~/systems/Bridge/components/TransfersBoard').then((m) => ({
    default: m.TransfersBoard,
  })),
);

const PANEL_HEIGHT_KEY = 'fuel:bridge-panel-height';
// BridgeFormSkeleton's height, which is the form before a wallet connects.
const DEFAULT_PANEL_HEIGHT = 510;

function readPanelHeight() {
  try {
    const saved = Number(sessionStorage.getItem(PANEL_HEIGHT_KEY));
    return saved > 0 ? saved : DEFAULT_PANEL_HEIGHT;
  } catch {
    return DEFAULT_PANEL_HEIGHT;
  }
}

// The child routes only match the URL; the panel renders here for both, so
// it stays mounted and the form and history animate into each other.
const BridgeLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isHistory = isBridgeHistory(pathname);
  const panel = useRef<HTMLDivElement>(null);
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
    <BridgePageShell
      board={(rail) => (
        <Suspense fallback={<TransfersBoardSkeleton />}>
          <TransfersBoard {...rail} />
        </Suspense>
      )}
    >
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
  );
};

export default BridgeLayout;
