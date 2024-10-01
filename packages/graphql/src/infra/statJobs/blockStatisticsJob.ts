import { DateHelper } from '../../core/Date';
import BlockDAO from '../dao/BlockDAO';

export async function generateHourlyBlockStatistics() {
  const blockDAO = new BlockDAO();

  // Get the last processed timestamp from the statistics table
  const latestStatisticsTimestamp =
    await blockDAO.findLatestStatisticsTimestamp();

  // If no statistics exist, start from the earliest block timestamp
  const initialStartTimestamp = latestStatisticsTimestamp
    ? DateHelper.addHours(latestStatisticsTimestamp, 1) // Next hour window
    : await blockDAO.getEarliestBlockTimestamp(); // Start from the earliest block

  // Adjust the startTimestamp to the beginning of the hour
  const startTimestamp = DateHelper.floorToHour(initialStartTimestamp);
  // Calculate the end timestamp as one hour after the start timestamp
  const endTimestamp = DateHelper.addHours(startTimestamp, 1);

  // Fetch blocks in the next 1-hour window
  const blocks = await blockDAO.getBlocksInRange(startTimestamp, endTimestamp);

  if (blocks.length > 0) {
    const numberOfBlocks = blocks.length;
    const cumulativeBlockReward = blocks.reduce(
      (sum, block) => sum + Number(block.reward),
      0,
    );
    const startBlock = blocks[0]._id;
    const endBlock = blocks[blocks.length - 1]._id;

    // Insert statistics into the block_statistics table
    await blockDAO.insertBlockStatistics(
      startTimestamp,
      numberOfBlocks,
      cumulativeBlockReward,
      startBlock,
      endBlock,
    );
  }
}
