import { bn } from 'fuels';

import { ethWallet, fuelWallet } from './wallets';

export async function logBalances(prefix: string) {
  const [ethBalance, fuelBalance] = await Promise.all([
    ethWallet.getBalance(),
    fuelWallet.getBalance(),
  ]);
  console.log(
    prefix,
    'ETH balance:',
    bn(ethBalance.toHexString()).formatUnits(18)
  );
  console.log(prefix, 'Fuel balance:', fuelBalance.formatUnits());
}
