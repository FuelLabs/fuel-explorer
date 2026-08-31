import { bech32 } from 'bech32';
import { getAddress } from 'viem';
import { ValidationError } from '../errors';

export function getValidAddress(address: string): string {
  try {
    return getAddress(address);
  } catch {
    throw new ValidationError(
      'Invalid address format, expected a valid Ethereum address',
    );
  }
}

const SEQUENCER_HRP = 'fuelsequencer';

export function convertEthAddressToSequencerUserAddress(
  ethAddress: string,
): `fuelsequencer${string}` | undefined {
  if (!ethAddress) return undefined;
  const addressBuffer = Buffer.from(ethAddress.slice(2), 'hex');
  const bech32Address = bech32.encode(
    SEQUENCER_HRP,
    bech32.toWords(addressBuffer),
  );
  return bech32Address as `fuelsequencer${string}`;
}
