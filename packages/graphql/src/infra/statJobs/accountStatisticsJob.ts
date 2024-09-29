import { DateHelper } from '../../core/Date';
import AccountDAO from '../dao/AccountDAO';

export async function generateHourlyAccountStatistics() {
  const accountDAO = new AccountDAO();

  // Get the last processed timestamp from the statistics table
  const latestStatistics = await accountDAO.findLatestStatistics();

  // If no statistics exist, start from the earliest account timestamp
  const initialStartTimestamp = latestStatistics?.timestamp
    ? DateHelper.addHours(latestStatistics.timestamp, 1) // Next hour window
    : await accountDAO.getEarliestAccountTimestamp(); // Start from the earliest account

  // Adjust the startTimestamp to the beginning of the hour
  const startTimestamp = DateHelper.floorToHour(initialStartTimestamp);
  // Calculate the end timestamp as one hour after the start timestamp
  const endTimestamp = DateHelper.addHours(startTimestamp, 1);

  // Fetch accounts created in the next 1-hour window
  const newAccountsInRange = await accountDAO.getAccountsInRange(
    startTimestamp,
    endTimestamp,
  );

  if (newAccountsInRange.length > 0) {
    // New accounts created in the window
    const new_accounts = newAccountsInRange.length;

    // Calculate daily active accounts in the current hour window
    const active_accounts = await accountDAO.getDailyActiveAccountsInRange(
      startTimestamp,
      endTimestamp,
    );

    // Calculate cumulative accounts by adding to the previous cumulative count
    const cumulative_accounts = latestStatistics?.cumulative_accounts
      ? latestStatistics.cumulative_accounts + new_accounts
      : new_accounts;

    // Insert statistics into the account_statistics table
    await accountDAO.insertAccountStatistics(
      startTimestamp,
      new_accounts,
      active_accounts,
      cumulative_accounts,
    );
  }
}
