import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { useReadContract } from 'wagmi';
import {
  BRIDGE_PAUSED_MESSAGE,
  BridgePausedBanner,
} from '../../components/BridgePausedBanner/BridgePausedBanner';
import { useFuelStreamXPaused } from './useFuelStreamXPaused';

jest.mock('wagmi', () => ({ useReadContract: jest.fn() }));
jest.mock('../../chains/eth', () => ({ ETH_CHAIN: { id: 1 } }));
jest.mock('../../utils/stakingAddresses', () => ({
  CURRENT_NETWORK_CONTRACTS: {
    FUEL_STREAM_X: '0x481aeEB9bdFe08f050d22F0b352356691c4B0b59',
  },
}));
jest.mock('@fuels/ui', () => {
  const Alert = ({ children }: { children: React.ReactNode }) => (
    <div role="alert">{children}</div>
  );
  Alert.Icon = ({ children }: { children: React.ReactNode }) => children;
  Alert.Text = ({ children }: { children: React.ReactNode }) => children;
  return { Alert };
});

const mockedUseReadContract = useReadContract as jest.Mock;

const render = (ui: React.ReactElement) => {
  const container = document.createElement('div');
  act(() => createRoot(container).render(ui));
  return container;
};

const HookProbe = () => <span>{String(useFuelStreamXPaused())}</span>;

describe('useFuelStreamXPaused', () => {
  afterEach(() => mockedUseReadContract.mockReset());

  it('reads paused() on FuelStreamX and polls every 60 s', () => {
    mockedUseReadContract.mockReturnValue({ data: false });
    render(<HookProbe />);
    expect(mockedUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        address: '0x481aeEB9bdFe08f050d22F0b352356691c4B0b59',
        functionName: 'paused',
        chainId: 1,
        query: expect.objectContaining({ refetchInterval: 60_000 }),
      }),
    );
  });

  it('shows the banner when paused() returns true', () => {
    mockedUseReadContract.mockReturnValue({ data: true });
    const container = render(<BridgePausedBanner />);
    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      BRIDGE_PAUSED_MESSAGE,
    );
  });

  it('hides the banner when paused() returns false', () => {
    mockedUseReadContract.mockReturnValue({ data: false });
    const container = render(<BridgePausedBanner />);
    expect(container.innerHTML).toBe('');
  });

  it('hides the banner when the read fails', () => {
    mockedUseReadContract.mockReturnValue({
      data: undefined,
      isError: true,
      error: new Error('rpc down'),
    });
    const container = render(<BridgePausedBanner />);
    expect(container.innerHTML).toBe('');
  });

  it('hides the banner while the read is loading', () => {
    mockedUseReadContract.mockReturnValue({ data: undefined, isLoading: true });
    const container = render(<BridgePausedBanner />);
    expect(container.innerHTML).toBe('');
  });
});
