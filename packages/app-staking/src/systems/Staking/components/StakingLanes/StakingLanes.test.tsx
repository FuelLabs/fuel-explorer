/// <reference types="jest" />

import { act } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { StakingLanes } from './StakingLanes';

const mockClaim = jest.fn();
const mockConnect = jest.fn();

jest.mock('../../hooks/useRigClaimable', () => ({
  useRigClaimable: () => mockClaim(),
}));

jest.mock('@fuels/react', () => ({
  useConnectUI: () => ({ connect: () => mockConnect() }),
}));

jest.mock('../../services/useTotalStake', () => ({
  useStakedBalanceL1: () => ({ total: 0n }),
}));

jest.mock('wagmi', () => ({
  useAccount: () => ({ isConnected: false }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      (
        ({
          'staking.lanes_label': 'Staking paths',
          'staking.tab_rig': 'Liquid Stake via The Rig',
          'staking.lane_rig_figure': 'To claim',
          'staking.lane_rig_connect':
            "Connect your wallet here to determine if you're eligible to claim stFUEL.",
          'staking.lane_rig_checking': 'Checking your claimable balance...',
          'staking.tab_ethereum': 'Stake on Ethereum Network',
          'staking.lane_ethereum_figure': 'Staked',
          'home.unavailable': 'Data unavailable',
          'portal.history.connect_fuel_wallet': 'Connect Fuel Wallet',
        }) as Record<string, string>
      )[key] ?? key,
  }),
}));

jest.mock('react-router-dom', () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children?: ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useLocation: () => ({ pathname: '/staking/on-fuel' }),
}));

jest.mock('framer-motion', () => ({
  useReducedMotion: () => true,
  motion: {
    span: ({ children }: { children?: ReactNode }) => <span>{children}</span>,
  },
}));

jest.mock('app-commons', () => ({
  FuelToken: { V2: 'V2' },
  TOKENS: { V2: { symbol: 'FUEL', decimals: 9 } },
}));

jest.mock('fuels', () => ({
  DECIMAL_FUEL: 9,
}));

jest.mock('@fuels/ui', () => ({
  LoadingBox: () => <span data-testid="rig-claim-loading" />,
}));

jest.mock('~staking/routes', () => ({
  Routes: {
    stakingRig: () => '/staking/on-fuel',
    stakingL1: () => '/staking/on-ethereum',
  },
}));

jest.mock('~staking/systems/Core/utils/bn', () => ({
  formatAmount: () => ({ formatted: { display: '1.00' } }),
}));

const CONNECT_PROMPT =
  "Connect your wallet here to determine if you're eligible to claim stFUEL.";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

function renderLanes() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<StakingLanes />);
  });
  const rig = container.querySelector(
    'a[href="/staking/on-fuel"]',
  ) as HTMLElement;
  const ethereum = container.querySelector(
    'a[href="/staking/on-ethereum"]',
  ) as HTMLElement;
  return {
    rig,
    ethereum,
    cleanup() {
      act(() => root.unmount());
      container.remove();
    },
  };
}

describe('StakingLanes Rig claim figure', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('asks for a Fuel wallet instead of showing 0 stFUEL', () => {
    mockConnect.mockClear();
    mockClaim.mockReturnValue({
      status: 'disconnected',
      pendingDeposit: undefined,
    });
    const view = renderLanes();
    const connect = view.rig.querySelector('button');

    expect(connect?.textContent).toBe(CONNECT_PROMPT);
    expect(view.rig.textContent).not.toContain('To claim');
    expect(view.rig.querySelector('.fuel-stat')).toBeNull();
    expect(view.ethereum.textContent).toContain('—');
    act(() => {
      connect?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    });
    expect(mockConnect).toHaveBeenCalledTimes(1);
    view.cleanup();
  });

  it('shows a loading state instead of a known zero', () => {
    mockClaim.mockReturnValue({ status: 'loading', pendingDeposit: undefined });
    const view = renderLanes();

    expect(view.rig.getAttribute('aria-busy')).toBe('true');
    expect(
      view.rig.querySelector('[data-testid="rig-claim-loading"]'),
    ).toBeTruthy();
    expect(view.rig.textContent).toContain('To claim');
    expect(view.rig.textContent).toContain(
      'Checking your claimable balance...',
    );
    expect(view.rig.querySelector('.fuel-stat')).toBeNull();
    view.cleanup();
  });

  it('shows an error instead of a known zero when the read fails', () => {
    mockClaim.mockReturnValue({ status: 'error', pendingDeposit: undefined });
    const view = renderLanes();
    const alert = view.rig.querySelector('[role="alert"]');

    expect(alert?.textContent).toBe('Data unavailable');
    expect(view.rig.textContent).toContain('To claim');
    expect(view.rig.querySelector('.fuel-stat')).toBeNull();
    view.cleanup();
  });

  it('shows 0 when a successful read is actually zero', () => {
    mockClaim.mockReturnValue({ status: 'ready', pendingDeposit: undefined });
    const view = renderLanes();

    expect(view.rig.textContent).toContain('To claim');
    expect(view.rig.querySelector('.fuel-stat')?.textContent).toBe('0');
    expect(view.rig.textContent).toContain('stFUEL');
    expect(view.rig.textContent).not.toContain(CONNECT_PROMPT);
    view.cleanup();
  });

  it('shows the formatted claim when the read returns a balance', () => {
    mockClaim.mockReturnValue({
      status: 'ready',
      pendingDeposit: {
        format: () => '12.50',
      },
    });
    const view = renderLanes();

    expect(view.rig.querySelector('.fuel-stat')?.textContent).toBe('12.50');
    expect(view.rig.textContent).toContain('stFUEL');
    expect(view.rig.querySelector('.fuel-stat')?.textContent).not.toBe('0');
    view.cleanup();
  });
});
