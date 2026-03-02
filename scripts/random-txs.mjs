/**
 * Continuously sends transactions at random rates (1-100 tx/burst) to simulate
 * realistic TPS variation. Runs indefinitely until Ctrl+C.
 */
import { Provider, Wallet } from 'fuels';

const PROVIDER_URL = 'http://127.0.0.1:4000/v1/graphql';
const SECRET = '0x7f8a325504e7315eda997db7861c9447f5c3eff26333b20180475d94443a10c6';
const SENDER_COUNT = 30;

async function main() {
  console.log('Connecting...');
  const provider = new Provider(PROVIDER_URL);
  const baseAssetId = await provider.getBaseAssetId();
  const master = Wallet.fromPrivateKey(SECRET, provider);

  // Create and fund sender wallets
  console.log(`Funding ${SENDER_COUNT} sender wallets...`);
  const senders = [];
  for (let i = 0; i < SENDER_COUNT; i++) {
    const w = Wallet.generate({ provider });
    senders.push(w);
    const tx = await master.transfer(w.address, 100_000_000, baseAssetId);
    await tx.waitForResult();
    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${SENDER_COUNT}`);
  }
  console.log('Ready!\n');

  const recipient = Wallet.generate({ provider });
  let totalSent = 0;

  // Run forever with random bursts
  while (true) {
    // Random burst size: 1-100 parallel transactions (capped by sender count)
    const burstSize = Math.min(
      Math.floor(Math.random() * 100) + 1,
      SENDER_COUNT
    );

    // Pick random senders for this burst
    const shuffled = [...senders].sort(() => Math.random() - 0.5);
    const batch = shuffled.slice(0, burstSize);

    const results = await Promise.allSettled(
      batch.map((s) =>
        s.transfer(recipient.address, 1, baseAssetId)
          .then((tx) => tx.waitForResult().then(() => true))
          .catch(() => false)
      )
    );

    const ok = results.filter((r) => r.status === 'fulfilled' && r.value).length;
    totalSent += ok;

    const now = new Date().toLocaleTimeString();
    console.log(`[${now}] Burst: ${ok}/${burstSize} tx  |  Total: ${totalSent}`);

    // Random pause between bursts: 1-8 seconds
    const pause = Math.floor(Math.random() * 7000) + 1000;
    await new Promise((r) => setTimeout(r, pause));
  }
}

main().catch(console.error);
