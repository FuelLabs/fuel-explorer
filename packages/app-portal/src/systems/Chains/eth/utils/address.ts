import { bn } from 'fuels';

export function parseEthAddressToFuel(address?: string) {
  return bn(address).toHex(32) as `0x${string};`;
}
