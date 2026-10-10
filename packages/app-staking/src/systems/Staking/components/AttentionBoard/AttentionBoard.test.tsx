/// <reference types="jest" />
import { type ReactNode, act } from 'react';
import { type Root, createRoot } from 'react-dom/client';

const COPY: Record<string, string> = {
  'staking.board.title': 'Open items',
  'staking.board.continue': 'Continue',
  'staking.board.action_needed': 'Action needed',
  'staking.status.loading': 'Loading...',
  'staking.event_type.withdraw': 'Withdraw',
  'staking.lane_ethereum': 'Ethereum',
  'staking.connect_tokens':
    'Connect your wallet to view available tokens for staking.',
  'staking.connect_ethereum': 'Connect Ethereum Wallet',
  'staking.board.load_error':
    'Error on fetching your open items. Something went wrong, try again later.',
  'staking.review.retry': 'Retry',
};

const mockRouter = { pathname: '/staking/on-ethereum' };

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string; count?: number }) => {
      if (key === 'staking.board.count') return `${opts?.count ?? 0} items`;
      return COPY[key] ?? opts?.defaultValue ?? key;
    },
    i18n: { language: 'en' },
  }),
}));

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: mockRouter.pathname }),
}));

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
}));

jest.mock(
  'connectkit',
  () => ({
    useModal: () => ({ setOpen: jest.fn() }),
  }),
  { virtual: true },
);

jest.mock('app-commons', () => ({
  FuelToken: { V2: 'V2' },
  TOKENS: { V2: { symbol: 'FUEL', decimals: 9 } },
}));

jest.mock('@fuels/ui', () => ({
  Button: ({
    children,
    onClick,
  }: {
    children?: ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  Tooltip: ({ children }: { children?: ReactNode }) => <>{children}</>,
  LoadingBox: () => <span data-testid="loading-box" />,
}));

jest.mock('~staking/systems/Staking/store/stakingTxDialogStore', () => ({
  stakingTxDialogEvents: { open: jest.fn() },
  stakingTxDialogStore: { send: jest.fn() },
}));

jest.mock('../../services/useRewards', () => ({
  useRewards: jest.fn(),
}));

jest.mock('../../services/useAccountValidators', () => ({
  useAccountValidators: jest.fn(),
}));

jest.mock('../../hooks/useStakingEvents/useStakingEvents', () => ({
  useAllStakingEvents: jest.fn(),
}));

jest.mock('../../hooks/useRigClaimable', () => ({
  useRigClaimable: () => ({ pendingDeposit: undefined }),
}));

jest.mock('../TransactionHistoryItem/constants', () => ({
  eventStatus: (event: { status?: string }) => {
    if (event.status === 'Finalized') return 'completed';
    if (event.status === 'ReadyToProcessWithdraw') return 'action';
    if (event.status === 'Skipped') return 'failed';
    return 'progress';
  },
  typeLabelKey: { Withdraw: 'staking.event_type.withdraw' },
  withdrawType: { Withdraw: 'TxWithdrawStatus' },
}));

const { useAccount } = require('wagmi') as { useAccount: jest.Mock };
const { useRewards } = require('../../services/useRewards') as {
  useRewards: jest.Mock;
};
const { useAccountValidators } =
  require('../../services/useAccountValidators') as {
    useAccountValidators: jest.Mock;
  };
const { useAllStakingEvents } =
  require('../../hooks/useStakingEvents/useStakingEvents') as {
    useAllStakingEvents: jest.Mock;
  };
const { AttentionBoard } = require('./AttentionBoard') as {
  AttentionBoard: () => JSX.Element | null;
};

const BOARD_ERROR =
  'Error on fetching your open items. Something went wrong, try again later.';

const pendingQuery = () => ({
  data: undefined,
  isSuccess: false,
  isError: false,
  isPending: true,
});

const successQuery = (data: unknown) => ({
  data,
  isSuccess: true,
  isError: false,
  isPending: false,
});

const errorQuery = () => ({
  data: undefined,
  isSuccess: false,
  isError: true,
  isPending: false,
});

const finalizeEvent = {
  id: 7,
  type: 'Withdraw',
  amount: '1000000000',
  status: 'ReadyToProcessWithdraw',
  statusInfo: {},
  timestampToFinish: '2099-01-01T00:00:00.000Z',
};

describe('AttentionBoard', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    mockRouter.pathname = '/staking/on-ethereum';
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    useAccount.mockReturnValue({
      address: '0xabc',
      isConnected: true,
    });
    useRewards.mockReturnValue(successQuery({ rewards: [] }));
    useAccountValidators.mockReturnValue(successQuery([]));
    useAllStakingEvents.mockReturnValue(successQuery([]));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const render = () => {
    act(() => {
      root.render(<AttentionBoard />);
    });
  };

  it('stays up with a loading state while its queries are in flight', () => {
    useRewards.mockReturnValue(pendingQuery());
    useAccountValidators.mockReturnValue(pendingQuery());
    useAllStakingEvents.mockReturnValue(pendingQuery());
    render();
    expect(container.textContent).toContain('Open items');
    const status = container.querySelector('[role="status"]');
    expect(status?.getAttribute('aria-label')).toBe('Loading...');
    expect(
      container.querySelector('[data-testid="loading-box"]'),
    ).not.toBeNull();
    expect(container.textContent).not.toContain(BOARD_ERROR);
  });

  it('stays up while a later history page is still loading', () => {
    useAllStakingEvents.mockReturnValue({
      ...successQuery([]),
      hasNextPage: true,
      isFetchingNextPage: true,
    });
    render();
    expect(container.textContent).toContain('Open items');
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).not.toContain(BOARD_ERROR);
  });

  it('stays up with an error when a query fails and there are no rows', () => {
    useAllStakingEvents.mockReturnValue(errorQuery());
    render();
    expect(container.textContent).toContain('Open items');
    expect(container.textContent).toContain(BOARD_ERROR);
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it('keeps a withdrawal that needs Finalize visible when another query fails', () => {
    useRewards.mockReturnValue(errorQuery());
    useAllStakingEvents.mockReturnValue(successQuery([finalizeEvent]));
    render();
    expect(container.textContent).toContain('Withdraw');
    expect(container.textContent).toContain('Continue');
    expect(container.textContent).toContain(BOARD_ERROR);
  });

  it('hides when every query succeeded and nothing is waiting', () => {
    render();
    expect(container.innerHTML).toBe('');
  });

  it('asks to connect instead of hiding while the wallet is disconnected', () => {
    useAccount.mockReturnValue({ address: undefined, isConnected: false });
    useRewards.mockReturnValue(pendingQuery());
    useAccountValidators.mockReturnValue(pendingQuery());
    useAllStakingEvents.mockReturnValue(pendingQuery());
    render();
    expect(container.textContent).toContain('Open items');
    expect(container.textContent).toContain(
      'Connect your wallet to view available tokens for staking.',
    );
    expect(container.querySelector('[role="status"]')).toBeNull();
  });
});
