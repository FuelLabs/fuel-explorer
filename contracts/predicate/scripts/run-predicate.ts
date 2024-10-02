import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { FUEL_CHAIN } from 'app-commons';
import { BaseAssetId, Predicate, Provider, Wallet, bn, hexlify } from 'fuels';

const { NEXT_PUBLIC_FUEL_CHAIN_NAME, PRIVATE_KEY } = process.env;
const BIN_PATH = resolve(__dirname, '../out/debug/predicate-app.bin');
const ABI_PATH = resolve(__dirname, '../out/debug/predicate-app-abi.json');
const AMOUNT = 300_000;
const GAS_DEDUCTION = 150_000;

if (!NEXT_PUBLIC_FUEL_CHAIN_NAME || !PRIVATE_KEY) {
  throw new Error(
    'Missing necessary config in .env file. Ensure NEXT_PUBLIC_FUEL_CHAIN_NAME and PRIVATE_KEY are set.',
  );
}

const providerUrl = FUEL_CHAIN.providerUrl;

async function main() {
  try {
    const binHex = hexlify(await fs.readFile(BIN_PATH));
    const provider = await Provider.create(providerUrl);
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY!, provider);

    // Fetch gas price configuration
    const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();
    const walletAddress = wallet.address.toB256();

    // Load ABI for predicate
    const abi = await fs.readFile(ABI_PATH, 'utf-8');
    const abiJson = JSON.parse(abi);
    const predicate = new Predicate(binHex, provider, abiJson);

    console.log('💰 Funding predicate...');

    // Transfer funds to predicate address
    const tx1 = await wallet.transfer(predicate.address, AMOUNT, BaseAssetId, { gasPrice });
    const res1 = await tx1.waitForResult();

    const predicateBalance = bn(await predicate.getBalance());
    console.log(`→ Transaction Id: ${res1.id}`);
    console.log(`→ Predicate balance: ${predicateBalance.format()}`);
    console.log(`→ Predicate Id: ${predicate.address.toB256()}`);
    console.log(`📝 Wallet address: ${walletAddress}\n`);

    console.log('⌛️ Running predicate...');
    predicate.setData(walletAddress);

    // Transfer funds back from predicate
    const transferAmount = AMOUNT - GAS_DEDUCTION;
    if (transferAmount <= 0) {
      throw new Error('Insufficient amount after gas deduction');
    }

    const tx2 = await predicate.transfer(wallet.address, transferAmount, BaseAssetId, { gasPrice });
    const res2 = await tx2.waitForResult();

    console.log(`→ Transaction Id: ${res2.id}`);
  } catch (error: any) {
    console.error('An error occurred:', error?.response?.errors?.[0]?.message || error.message);
  }
}

main();
