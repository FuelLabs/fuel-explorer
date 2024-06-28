import { TxFuelToEthService } from '../app-portal/src/systems/Chains/fuel/services/txFuelToEth';
const calculateDelayBasedOnTransactionTimeToFinalize =
  TxFuelToEthService.calculateDelayBasedOnTransactionTimeToFinalize;

describe('calculateDelayBasedOnTransactionTimeToFinalize', () => {
  test('Should calculate delay based on more than two days to finalize', () => {
    console.log(process.env.NEXT_PUBLIC_FUEL_CHAIN_NAME);
    const actualDate = new Date('2024-06-20T15:00:01');
    const futureDate = new Date('2024-06-22T15:00:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    const delay = calculateDelayBasedOnTransactionTimeToFinalize({
      txId: 'abc',
      timeToFinalize: `${futureDate.getTime()}`,
    });
    expect(delay).toBe(86400000);
    jest.restoreAllMocks();
  });

  it('Should calculate delay based on more than one day to finalize', () => {
    const actualDate = new Date('2024-06-20T15:00:01');
    const futureDate = new Date('2024-06-21T15:00:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    const delay = calculateDelayBasedOnTransactionTimeToFinalize({
      txId: 'abc',
      timeToFinalize: `${futureDate.getTime()}`,
    });
    expect(delay).toBe(86400000);
    jest.restoreAllMocks();
  });

  it('Should calculate delay based on more than one hour to finalize', () => {
    const actualDate = new Date('2024-06-20T15:00:01');
    const futureDate = new Date('2024-06-20T16:00:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    const delay = calculateDelayBasedOnTransactionTimeToFinalize({
      txId: 'abc',
      timeToFinalize: `${futureDate.getTime()}`,
    });
    expect(delay).toBe(3600000);
    jest.restoreAllMocks();
  });

  it('Should calculate delay based on more than ten minutes to finalize', () => {
    const actualDate = new Date('2024-06-20T15:00:01');
    const futureDate = new Date('2024-06-20T15:10:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    const delay = calculateDelayBasedOnTransactionTimeToFinalize({
      txId: 'abc',
      timeToFinalize: `${futureDate.getTime()}`,
    });
    expect(delay).toBe(600000);
    jest.restoreAllMocks();
  });

  it('Should calculate delay based on more than one minute to finalize', () => {
    const actualDate = new Date('2024-06-20T15:00:01');
    const futureDate = new Date('2024-06-20T15:01:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    const delay = calculateDelayBasedOnTransactionTimeToFinalize({
      txId: 'abc',
      timeToFinalize: `${futureDate.getTime()}`,
    });
    expect(delay).toBe(60000);
    jest.restoreAllMocks();
  });

  it('Should calculate delay based on less than one minue to finalize', () => {
    const actualDate = new Date('2024-06-20T15:00:01');
    const futureDate = new Date('2024-06-20T15:00:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    const delay = calculateDelayBasedOnTransactionTimeToFinalize({
      txId: 'abc',
      timeToFinalize: `${futureDate.getTime()}`,
    });
    expect(delay).toBe(10000);
    jest.restoreAllMocks();
  });
});
