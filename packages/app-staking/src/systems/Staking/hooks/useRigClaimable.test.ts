/// <reference types="jest" />

import { selectRigClaimStatus, useRigClaimable } from './useRigClaimable';

type QueryOptions = {
  enabled: boolean;
  queryFn: () => Promise<{ pendingDeposit: unknown }>;
};

const mockUseAccount = jest.fn();
const mockUseWallet = jest.fn();
const mockUseQuery = jest.fn();

jest.mock('@fuels/react', () => ({
  useAccount: () => mockUseAccount(),
  useWallet: () => mockUseWallet(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: (options: QueryOptions) => mockUseQuery(options),
}));

jest.mock('app-commons', () => {
  const contracts = { L2_STAKING: '0xcontract' };
  (globalThis as { __rigContracts?: typeof contracts }).__rigContracts =
    contracts;
  return { CURRENT_NETWORK_CONTRACTS: contracts };
});

jest.mock('~staking/contracts/rig/StakingMigration', () => ({
  StakingMigration: class {
    functions = {
      get_pending_deposit_to_be_claimed: () => ({
        dryRun: () =>
          (
            globalThis as {
              __rigDryRun?: () => Promise<{
                value?: { gt: (n: number) => boolean };
              }>;
            }
          ).__rigDryRun?.(),
      }),
    };
  },
}));

const contracts = () =>
  (globalThis as { __rigContracts: { L2_STAKING: string } }).__rigContracts;

const idleQuery = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isPending: false,
  isError: false,
  isSuccess: false,
};

function settledAccount(account: string | null) {
  mockUseAccount.mockReturnValue({
    account,
    isFetched: true,
    isLoading: false,
    isFetching: false,
  });
}

function settledWallet(wallet: { address: { toB256: () => string } } | null) {
  mockUseWallet.mockReturnValue({
    wallet,
    isFetched: true,
    isLoading: false,
    isFetching: false,
  });
}

function connect() {
  settledAccount('0xaccount');
  settledWallet({ address: { toB256: () => '0xbits' } });
}

describe('selectRigClaimStatus', () => {
  const base = {
    isConnected: false,
    isResolvingConnection: false,
    isQueryLoading: false,
    isQueryError: false,
    isQuerySuccess: false,
  };

  it('asks for a wallet when none is connected', () => {
    expect(selectRigClaimStatus(base)).toBe('disconnected');
  });

  it('stays loading while the Fuel account is still unresolved', () => {
    expect(selectRigClaimStatus({ ...base, isResolvingConnection: true })).toBe(
      'loading',
    );
  });

  it('stays loading while a connected wallet is being read', () => {
    expect(
      selectRigClaimStatus({
        ...base,
        isConnected: true,
        isQueryLoading: true,
      }),
    ).toBe('loading');
  });

  it('is an error when the read fails', () => {
    expect(
      selectRigClaimStatus({
        ...base,
        isConnected: true,
        isQueryError: true,
      }),
    ).toBe('error');
  });

  it('is an error when a connected wallet never gets a successful read', () => {
    expect(selectRigClaimStatus({ ...base, isConnected: true })).toBe('error');
  });

  it('is ready only after a successful read, including a zero balance', () => {
    expect(
      selectRigClaimStatus({
        ...base,
        isConnected: true,
        isQuerySuccess: true,
      }),
    ).toBe('ready');
  });
});

describe('useRigClaimable', () => {
  let queryOptions: QueryOptions;

  beforeEach(() => {
    contracts().L2_STAKING = '0xcontract';
    mockUseQuery.mockImplementation((options: QueryOptions) => {
      queryOptions = options;
      return idleQuery;
    });
    settledAccount(null);
    settledWallet(null);
    (globalThis as { __rigDryRun?: () => Promise<unknown> }).__rigDryRun =
      undefined;
  });

  it('does not treat a missing Fuel wallet as a zero balance', () => {
    expect(useRigClaimable()).toEqual({
      status: 'disconnected',
      pendingDeposit: undefined,
    });
    expect(queryOptions.enabled).toBe(false);
  });

  it('stays loading until the account query has settled', () => {
    mockUseAccount.mockReturnValue({
      account: null,
      isFetched: false,
      isLoading: true,
      isFetching: true,
    });

    expect(useRigClaimable().status).toBe('loading');
  });

  it('stays loading while the claim query is in flight', () => {
    connect();
    mockUseQuery.mockImplementation((options: QueryOptions) => {
      queryOptions = options;
      return {
        ...idleQuery,
        isPending: true,
        isFetching: true,
        isLoading: true,
      };
    });

    expect(useRigClaimable().status).toBe('loading');
    expect(queryOptions.enabled).toBe(true);
  });

  it('reports an error instead of a zero balance when the query fails', async () => {
    connect();
    const error = new Error('rpc down');
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    (globalThis as { __rigDryRun: () => Promise<never> }).__rigDryRun = () =>
      Promise.reject(error);

    mockUseQuery.mockImplementation((options: QueryOptions) => {
      queryOptions = options;
      return { ...idleQuery, isError: true };
    });

    expect(useRigClaimable()).toEqual({
      status: 'error',
      pendingDeposit: undefined,
    });
    await expect(queryOptions.queryFn()).rejects.toBe(error);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('reports an error when the staking contract is not configured', () => {
    connect();
    contracts().L2_STAKING = '0x';

    expect(useRigClaimable()).toEqual({
      status: 'error',
      pendingDeposit: undefined,
    });
    expect(queryOptions.enabled).toBe(false);
  });

  it('keeps a successful zero as a ready balance with nothing to claim', async () => {
    connect();
    (globalThis as { __rigDryRun: () => Promise<unknown> }).__rigDryRun = () =>
      Promise.resolve({ value: { gt: () => false } });
    mockUseQuery.mockImplementation((options: QueryOptions) => {
      queryOptions = options;
      return {
        ...idleQuery,
        isSuccess: true,
        data: { pendingDeposit: undefined },
      };
    });

    expect(useRigClaimable()).toEqual({
      status: 'ready',
      pendingDeposit: undefined,
    });
    await expect(queryOptions.queryFn()).resolves.toEqual({
      pendingDeposit: undefined,
    });
  });

  it('returns a positive claim from a successful read', async () => {
    connect();
    const pendingDeposit = { gt: () => true };
    (globalThis as { __rigDryRun: () => Promise<unknown> }).__rigDryRun = () =>
      Promise.resolve({ value: pendingDeposit });
    mockUseQuery.mockImplementation((options: QueryOptions) => {
      queryOptions = options;
      return {
        ...idleQuery,
        isSuccess: true,
        data: { pendingDeposit },
      };
    });

    expect(useRigClaimable()).toEqual({
      status: 'ready',
      pendingDeposit,
    });
    await expect(queryOptions.queryFn()).resolves.toEqual({ pendingDeposit });
  });
});
