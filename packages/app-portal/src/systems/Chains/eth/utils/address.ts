import { bn } from 'fuels';
import { isAddress } from 'viem';

export function parseEthAddressToFuel(address?: string) {
  return bn(address).toHex(32) as `0x${string};`;
}

export function parseFuelAddressToEth(address?: string) {
  return bn(address, 'hex').toHex(20) as `0x${string};`;
}

export function isErc20Address(address?: string) {
  return address && isAddress(address);
}

export function isSameEthAddress(address1?: string, address2?: string) {
  return parseFuelAddressToEth(address1) === parseFuelAddressToEth(address2);
}
