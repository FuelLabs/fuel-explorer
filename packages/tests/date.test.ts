import { distanceToNow } from '../app-portal/src/systems/Chains/fuel/utils/date';

describe('date', () => {
  it('Should generate distance from now in less than a minute', () => {
    const actualDate = new Date('2024-06-19T15:00:01');
    const futureDate = new Date('2024-06-19T15:00:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    expect(distanceToNow(futureDate)).toBe('less than a minute');
    jest.restoreAllMocks();
  });

  it('Should generate distance from now in a minute', () => {
    const actualDate = new Date('2024-06-19T15:00:01');
    const futureDate = new Date('2024-06-19T15:01:11');
    jest.useFakeTimers().setSystemTime(actualDate);
    expect(distanceToNow(futureDate)).toBe('a minute');
    jest.restoreAllMocks();
  });
});
