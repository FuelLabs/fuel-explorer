import { getBridgeSolidityContracts } from 'app-commons';
import { encodeAbiParameters, encodeEventTopics, pad } from 'viem';
import { FUEL_ERC_20_GATEWAY } from '../contracts/FuelErc20Gateway';
import { FUEL_MESSAGE_PORTAL } from '../contracts/FuelMessagePortal';
import { TxEthToFuelService } from './txEthToFuel';

jest.mock('app-commons', () => ({
  FUEL_INDEXER_API: '',
  IS_FUEL_DEV_CHAIN: false,
  absoluteUrl: (path: string) => path,
  getBridgeSolidityContracts: jest.fn(),
  getBridgeTokenContracts: jest.fn(),
}));
jest.mock('app-commons/safeWriteContract', () => ({
  safeWriteContract: jest.fn(),
}));

const PORTAL = '0x01855B78C1f8868DE70e84507ec735983bf262dA' as const;
const GATEWAY = '0xd1d5a4379dccC46D5c8D1c6c2656ce705698e359' as const;
const ATTACKER = '0x000000000000000000000000000000000000dEaD' as const;
const TOKEN = '0x00000000000000000000000000000000000000B1' as const;
const FORGED_TOKEN = '0x00000000000000000000000000000000000000b2' as const;
const RECIPIENT = `0x${'cd'.repeat(32)}` as const;
const NONCE = 42n;

const word = (value: `0x${string}` | bigint) =>
  pad(typeof value === 'bigint' ? `0x${value.toString(16)}` : value, {
    size: 32,
  }).slice(2);

function messageSent(address: string, token: `0x${string}`, amount: bigint) {
  const topics = encodeEventTopics({
    abi: FUEL_MESSAGE_PORTAL.abi,
    eventName: 'MessageSent',
    args: { sender: pad(GATEWAY), recipient: RECIPIENT, nonce: NONCE },
  } as never);
  const payload = `0x${[
    word('0x01'),
    word('0x00'),
    word(token),
    word('0x00'),
    word(pad(ATTACKER)),
    word(RECIPIENT),
    word(amount),
    word('0x00'),
  ].join('')}`;
  const data = encodeAbiParameters(
    [{ type: 'uint256' }, { type: 'bytes' }],
    [amount, payload as `0x${string}`],
  );
  return { address, topics, data };
}

function deposit(address: string, token: `0x${string}`, amount: bigint) {
  const topics = encodeEventTopics({
    abi: FUEL_ERC_20_GATEWAY.abi,
    eventName: 'Deposit',
    args: { sender: pad(ATTACKER), tokenAddress: token },
  } as never);
  const data = encodeAbiParameters([{ type: 'uint256' }], [amount]);
  return { address, topics, data };
}

function client(logs: unknown[]) {
  return {
    getTransactionReceipt: jest.fn(async () => ({
      status: 'success',
      blockHash: `0x${'11'.repeat(32)}`,
      blockNumber: 100n,
      logs,
    })),
    getBlock: jest.fn(async () => ({ timestamp: 1_700_000_000n })),
    readContract: jest.fn(async () => 18),
  } as never;
}

describe('TxEthToFuelService.getReceiptsInfo', () => {
  beforeEach(() => {
    (getBridgeSolidityContracts as jest.Mock).mockResolvedValue({
      FuelMessagePortal: PORTAL,
      FuelERC20GatewayV4: GATEWAY,
    });
  });

  it('reads the amount from the gateway, ignoring a forged Deposit after it', async () => {
    const info = await TxEthToFuelService.getReceiptsInfo({
      ethTxId: `0x${'aa'.repeat(32)}`,
      inputEthTxNonce: NONCE,
      ethPublicClient: client([
        messageSent(PORTAL, TOKEN, 1n),
        deposit(GATEWAY, TOKEN, 1n),
        deposit(ATTACKER, TOKEN, 5_000_000_000n),
      ]),
    } as never);
    expect(info.amount?.toString()).toBe('1');
    expect(info.erc20Token?.address.toLowerCase()).toBe(TOKEN.toLowerCase());
  });

  it('ignores a same-nonce MessageSent that the portal did not emit', async () => {
    const info = await TxEthToFuelService.getReceiptsInfo({
      ethTxId: `0x${'aa'.repeat(32)}`,
      inputEthTxNonce: NONCE,
      ethPublicClient: client([
        messageSent(PORTAL, TOKEN, 1n),
        deposit(GATEWAY, TOKEN, 1n),
        messageSent(ATTACKER, FORGED_TOKEN, 9_000_000n),
        deposit(ATTACKER, FORGED_TOKEN, 9_000_000n),
      ]),
    } as never);
    expect(info.amount?.toString()).toBe('1');
    expect(info.receiptErc20Address?.toLowerCase()).toBe(TOKEN.toLowerCase());
  });
});
