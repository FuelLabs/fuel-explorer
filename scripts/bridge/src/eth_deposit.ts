import { BN, bn } from 'fuels';

import { FuelMessagePortal__factory } from '../fuel-bridge/portal-contracts';

import { logBalances, waitForMessage, ethWallet, fuelWallet } from './utils';

async function main() {
  await logBalances('initial');

  const response: {
    FuelMessagePortal: string;
  } = await fetch('http://localhost:8080/deployments.local.json').then((res) =>
    res.json()
  );

  const fuelPortal = FuelMessagePortal__factory.connect(
    response.FuelMessagePortal,
    ethWallet
  );
  // Parse 18 units of ETH
  const value = bn.parseUnits('1.0', 18).toHex();
  const tx = await fuelPortal.depositETH(fuelWallet.address.toHexString(), {
    value,
  });
  const result = await tx.wait();

  const event = fuelPortal.interface.parseLog(result.logs[0]);
  const depositMessageNonce = new BN(event.args.nonce.toHexString());

  await waitForMessage(
    fuelWallet.provider,
    fuelWallet.address,
    depositMessageNonce,
    1_000_000
  );
  await logBalances('final');
}

main();
