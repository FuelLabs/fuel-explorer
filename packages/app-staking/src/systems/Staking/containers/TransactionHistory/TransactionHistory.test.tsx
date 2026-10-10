/// <reference types="jest" />
import { type ReactNode, act } from 'react';
import { type Root, createRoot } from 'react-dom/client';

const COPY: Record<string, string> = {
  'staking.empty.transactions': "You don't have any transactions yet.",
  'staking.empty.start': 'Start staking',
  'staking.connect_positions':
    'Please connect your wallet to view your staking positions.',
  'staking.connect_ethereum': 'Connect Ethereum Wallet',
  'staking.history.load_error':
    'Error on fetching transactions. Something went wrong, try again later.',
  'staking.review.retry': 'Retry',
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) =>
      COPY[key] ?? opts?.defaultValue ?? key,
    i18n: { language: 'en' },
  }),
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

jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children?: ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
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
  VStack: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

jest.mock('~staking/systems/Staking/store/stakingTxDialogStore', () => ({
  stakingTxDialogEvents: { open: jest.fn() },
  stakingTxDialogStore: { send: jest.fn() },
}));

jest.mock('../../hooks/useStakingEvents/useStakingEvents', () => ({
  useAllStakingEvents: jest.fn(),
}));

jest.mock(
  '../../components/TransactionHistoryFilters/TransactionHistoryFilters',
  () => ({
    TransactionHistoryFilters: () => <div>history-filters</div>,
  }),
);

jest.mock(
  '../../components/TransactionHistoryItem/TransactionHistoryItem',
  () => ({
    TransactionHistoryItem: ({ isLoading }: { isLoading?: boolean }) =>
      isLoading ? <div role="status">loading</div> : <div>transaction</div>,
    transactionHistoryItemClassNames: {
      dateCol: 'date',
      typeCol: 'type',
      amountCol: 'amount',
      etaCol: 'eta',
      actionsCol: 'actions',
    },
  }),
);

jest.mock(
  '~staking/systems/Core/components/AnimatedTable/AnimatedTable',
  () => ({
    AnimatedTable: ({ children }: { children?: ReactNode }) => (
      <div>{children}</div>
    ),
  }),
);

jest.mock(
  '~staking/systems/Core/components/ListPagination/ListPagination',
  () => ({
    ListPagination: () => <div>pagination</div>,
  }),
);

jest.mock('../../components/TransactionHistoryItem/constants', () => ({
  eventStatus: (event: { status?: string }) => {
    if (event.status === 'Finalized') return 'completed';
    if (event.status === 'ReadyToProcessWithdraw') return 'action';
    if (event.status === 'Skipped') return 'failed';
    return 'progress';
  },
}));

const { useAccount } = require('wagmi') as {
  useAccount: jest.Mock;
};
const { useAllStakingEvents } =
  require('../../hooks/useStakingEvents/useStakingEvents') as {
    useAllStakingEvents: jest.Mock;
  };
const { TransactionHistory } = require('./TransactionHistory') as {
  TransactionHistory: () => JSX.Element;
};

const EMPTY = "You don't have any transactions yet.";
const HISTORY_ERROR =
  'Error on fetching transactions. Something went wrong, try again later.';

const pending = {
  data: undefined,
  isPending: true,
  isFetching: true,
  isError: false,
  isSuccess: false,
  refetch: jest.fn(),
};

const failed = {
  data: undefined,
  isPending: false,
  isFetching: false,
  isError: true,
  isSuccess: false,
  refetch: jest.fn(),
};

const succeeded = (data: unknown[]) => ({
  data,
  isPending: false,
  isFetching: false,
  isError: false,
  isSuccess: true,
  refetch: jest.fn(),
});

describe('TransactionHistory', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    useAccount.mockReturnValue({
      address: '0xabc',
      isConnected: true,
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  const render = () => {
    act(() => {
      root.render(<TransactionHistory />);
    });
  };

  it('shows an error when the history query fails', () => {
    useAllStakingEvents.mockReturnValue(failed);
    render();
    expect(container.textContent).toContain(HISTORY_ERROR);
    expect(container.querySelector('[role="alert"]')).not.toBeNull();
    expect(container.textContent).not.toContain(EMPTY);
  });

  it('keeps loaded rows and shows an error when a later page fails', () => {
    useAllStakingEvents.mockReturnValue({
      ...failed,
      data: [
        {
          id: 1,
          type: 'Withdraw',
          status: 'ReadyToProcessWithdraw',
        },
      ],
    });
    render();
    expect(container.textContent).toContain('transaction');
    expect(container.textContent).toContain(HISTORY_ERROR);
    expect(container.textContent).not.toContain(EMPTY);
  });

  it('does not show the empty copy while the history query is loading', () => {
    useAllStakingEvents.mockReturnValue(pending);
    render();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('history-filters');
    expect(container.textContent).not.toContain(EMPTY);
    expect(container.textContent).not.toContain(HISTORY_ERROR);
  });

  it('shows the empty copy when the query succeeds with no rows', () => {
    useAllStakingEvents.mockReturnValue(succeeded([]));
    render();
    expect(container.textContent).toContain(EMPTY);
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.textContent).not.toContain('history-filters');
  });

  it('shows rows when the query succeeds with transactions', () => {
    useAllStakingEvents.mockReturnValue(
      succeeded([
        {
          id: 1,
          type: 'Withdraw',
          status: 'ReadyToProcessWithdraw',
        },
      ]),
    );
    render();
    expect(container.textContent).toContain('transaction');
    expect(container.textContent).not.toContain(EMPTY);
    expect(container.textContent).not.toContain(HISTORY_ERROR);
  });

  it('asks to connect instead of showing an empty history', () => {
    useAccount.mockReturnValue({ address: undefined, isConnected: false });
    useAllStakingEvents.mockReturnValue(pending);
    render();
    expect(container.textContent).toContain(
      'Please connect your wallet to view your staking positions.',
    );
    expect(container.textContent).not.toContain(EMPTY);
  });
});
