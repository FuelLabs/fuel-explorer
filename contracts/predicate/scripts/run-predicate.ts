import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { BaseAssetId, Predicate, Provider, Wallet, bn, hexlify } from "fuels";

const { FUEL_PROVIDER, PRIVATE_KEY } = process.env;
const BIN_PATH = resolve(__dirname, "../out/debug/predicate-app.bin");
const AMOUNT = 300_000;

if (!FUEL_PROVIDER || !PRIVATE_KEY) {
  throw new Error(
    "Missing some config in .env file. Should have FUEL_PROVIDER and PRIVATE_KEY",
  );
}

async function main() {
  const binHex = hexlify(await fs.readFile(BIN_PATH));
  const provider = await Provider.create(FUEL_PROVIDER!);
  const wallet = Wallet.fromPrivateKey(PRIVATE_KEY!, provider);
  const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();
  const walletAddress = wallet.address.toB256();
  const abiPath = resolve(__dirname, "../out/debug/predicate-app-abi.json");
  const abi = await fs.readFile(abiPath, "utf-8");
  const abiJson = JSON.parse(abi);
  const predicate = new Predicate(binHex, provider, abiJson);

  console.log("💰 Funding predicate...");
  const tx1 = await wallet.transfer(predicate.address, AMOUNT, BaseAssetId, {
    gasPrice,
  });

  const res1 = await tx1.waitForResult();
  const predicateBalance = bn(await predicate.getBalance());
  console.log(`→ Transaction Id: ${res1.id}`);
  console.log(`→ Predicate balance: ${predicateBalance.format()}`);
  console.log(`→ Predicate Id: ${predicate.address.toB256()}`);
  console.log(`📝 Wallet address: ${walletAddress}\n`);

  console.log("⌛️ Running predicate...");
  predicate.setData(walletAddress);

  try {
    const tx2 = await predicate.transfer(
      wallet.address,
      AMOUNT - 150_000,
      BaseAssetId,
      {
        gasPrice,
      },
    );
    const res2 = await tx2.waitForResult();
    console.log(`→ Transaction Id: ${res2.id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error?.response?.errors?.[0].message);
  }
}

main();
