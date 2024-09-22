import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { FUEL_CHAIN } from 'app-commons';
import { BaseAssetId, Predicate, Provider, Wallet, bn, hexlify } from 'fuels';

const { NEXT_PUBLIC_FUEL_CHAIN_NAME, PRIVATE_KEY } = process.env;
const BIN_PATH = resolve(__dirname, '../out/debug/predicate-app.bin');
const AMOUNT = 300_000;

if (!NEXT_PUBLIC_FUEL_CHAIN_NAME || !PRIVATE_KEY) {
  throw new Error(
    'Missing some config in .env file. Should have NEXT_PUBLIC_FUEL_CHAIN_NAME and PRIVATE_KEY',
  );
}

const providerUrl = FUEL_CHAIN.providerUrl;

async function loadFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

async function main() {
  try {
    const binHex = hexlify(await fs.readFile(BIN_PATH));
    const provider = await Provider.create(providerUrl);
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY!, provider);
    const { minGasPrice: gasPrice } = await wallet.provider.getGasConfig();
    const walletAddress = wallet.address.toB256();
    const abiPath = resolve(__dirname, '../out/debug/predicate-app-abi.json');
    const abiJson = JSON.parse(await loadFile(abiPath));
    const predicate = new Predicate(binHex, provider, abiJson);

    console.log('💰 Funding predicate...');
    const tx1 = await wallet.transfer(predicate.address, AMOUNT, BaseAssetId, { gasPrice });
    const res1 = await tx1.waitForResult();
    const predicateBalance = bn(await predicate.getBalance());

    console.log(`→ Transaction Id: ${res1.id}`);
    console.log(`→ Predicate balance: ${predicateBalance.format()}`);
    console.log(`→ Predicate Id: ${predicate.address.toB256()}`);
    console.log(`📝 Wallet address: ${walletAddress}\n`);

    console.log('⌛️ Running predicate...');
    predicate.setData(walletAddress);

    const tx2 = await predicate.transfer(wallet.address, AMOUNT - 150_000, BaseAssetId, { gasPrice });
    const res2 = await tx2.waitForResult();
    console.log(`→ Transaction Id: ${res2.id}`);
  } catch (error: any) {
    console.error(error?.response?.errors?.[0]?.message || error.message);
  }
}

main();
