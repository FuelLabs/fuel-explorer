import { DateHelper } from '../../core/Date';
import TransactionDAO from '../dao/TransactionDAO';

export async function generateHourlyTransactionStatistics() {
  const transactionDAO = new TransactionDAO();

  // Get the last processed timestamp from the statistics table
  const latestStatistics = await transactionDAO.findLatestStatistics();

  // If no statistics exist, start from the earliest tx timestamp
  const initialStartTimestamp = latestStatistics?.timestamp
    ? DateHelper.addHours(latestStatistics.timestamp, 1) // Next hour window
    : await transactionDAO.getEarliestTransactionTimestamp(); // Start from the earliest tx

  // Adjust the startTimestamp to the beginning of the hour
  const startTimestamp = DateHelper.floorToHour(initialStartTimestamp);
  // Calculate the end timestamp as one hour after the start timestamp
  const endTimestamp = DateHelper.addHours(startTimestamp, 1);
  // Fetch transactions in the next 1-hour window
  const transactions = await transactionDAO.getTransactionsInRange(
    startTimestamp,
    endTimestamp,
  );

  if (transactions.length > 0) {
    const transaction_count = transactions.length;
    const transaction_count_cumulative =
      latestStatistics?.transaction_count_cumulative
        ? latestStatistics?.transaction_count_cumulative + transaction_count
        : transaction_count;
    const fee_spent = transactions.reduce(
      (sum, transaction) => sum + Number(transaction.fee),
      0,
    );
    const fee_spent_cumulative = latestStatistics?.fee_spent_cumulative
      ? latestStatistics?.fee_spent_cumulative + fee_spent
      : fee_spent;
    const gas_used = transactions.reduce(
      (sum, transaction) => sum + Number(transaction.gas),
      0,
    );
    const gas_used_cumulative = latestStatistics?.gas_used_cumulative
      ? latestStatistics?.gas_used_cumulative + gas_used
      : gas_used;
    const startBlock = transactions[0].block_id;
    const endBlock = transactions[transactions.length - 1].block_id;

    // Insert statistics into the block_statistics table
    await transactionDAO.insertTransactionStatistics(
      startTimestamp,
      startBlock,
      endBlock,
      transaction_count,
      transaction_count_cumulative,
      gas_used,
      gas_used_cumulative,
      fee_spent,
      fee_spent_cumulative,
    );
  }
}
