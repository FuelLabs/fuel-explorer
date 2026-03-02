/**
 * Sends a burst of parallel transactions to the local Fuel node to generate TPS spikes.
 * Usage: node scripts/send-txs.mjs [rounds] [parallel]
 *   rounds: number of rounds to send (default 20)
 *   parallel: transactions per round sent simultaneously (default 20)
 */
import { Provider, Wallet, bn } from 'fuels';

const PROVIDER_URL = 'http://127.0.0.1:4000/v1/graphql';
const ROUNDS = parseInt(process.argv[2] || '20', 10);
const PARALLEL = parseInt(process.argv[3] || '20', 10);
const SECRET = '0x7f8a325504e7315eda997db7861c9447f5c3eff26333b20180475d94443a10c6';

async function main() {
  console.log(`Connecting to ${PROVIDER_URL}...`);
  const provider = new Provider(PROVIDER_URL);
  const baseAssetId = await provider.getBaseAssetId();

  // Create multiple sender wallets from the same key won't work for UTXOs.
  // Instead, first fund multiple wallets, then use them all in parallel.
  const master = Wallet.fromPrivateKey(SECRET, provider);
  const balance = await master.getBalance(baseAssetId);
  console.log(`Master wallet: ${master.address.toB256()}`);
  console.log(`Balance: ${balance.toString()}`);

  // Create and fund sender wallets
  const SENDER_COUNT = PARALLEL;
  console.log(`\nCreating ${SENDER_COUNT} sender wallets...`);
  const senders = [];
  for (let i = 0; i < SENDER_COUNT; i++) {
    const w = Wallet.generate({ provider });
    senders.push(w);
  }

  // Fund each sender with enough for many transactions
  console.log(`Funding ${SENDER_COUNT} wallets (sequentially)...`);
  for (let i = 0; i < senders.length; i++) {
    try {
      const tx = await master.transfer(senders[i].address, 10_000_000, baseAssetId);
      await tx.waitForResult();
      if ((i + 1) % 5 === 0) console.log(`  Funded ${i + 1}/${SENDER_COUNT}`);
    } catch (err) {
      console.error(`  Failed to fund wallet ${i}:`, err.message?.slice(0, 80));
    }
  }
  console.log(`Funded all ${SENDER_COUNT} wallets.\n`);

  // Create a single recipient
  const recipient = Wallet.generate({ provider });

  // Now send parallel bursts
  let totalSent = 0;
  let totalFailed = 0;

  console.log(`Sending ${ROUNDS} rounds of ${PARALLEL} parallel transactions...\n`);

  for (let round = 0; round < ROUNDS; round++) {
    const promises = senders.map((sender) =>
      sender
        .transfer(recipient.address, 1, baseAssetId)
        .then(async (tx) => {
          await tx.waitForResult();
          return true;
        })
        .catch(() => false)
    );

    const results = await Promise.allSettled(promises);
    const succeeded = results.filter(
      (r) => r.status === 'fulfilled' && r.value === true
    ).length;
    totalSent += succeeded;
    totalFailed += PARALLEL - succeeded;

    console.log(
      `  Round ${round + 1}/${ROUNDS}: ${succeeded}/${PARALLEL} succeeded (total: ${totalSent})`
    );
  }

  console.log(`\nDone! ${totalSent} transactions sent, ${totalFailed} failed.`);
  console.log('Wait for the indexer to catch up, then check the explorer.');
}

main().catch(console.error);
