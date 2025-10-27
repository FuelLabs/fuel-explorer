import type { HexAddress } from 'app-commons';
import { bech32 } from 'bech32';
import type { SequencerValidatorAddress } from '~staking/systems/Core';

const hrp = 'fuelsequencervaloper';

function hexToBytes(hex: string): Uint8Array {
  const normalizedHex = hex.length % 2 === 0 ? hex : `0${hex}`;
  const byteLength = normalizedHex.length / 2;
  const bytes = new Uint8Array(byteLength);
  for (let i = 0; i < byteLength; i += 1) {
    const byte = normalizedHex.substr(i * 2, 2);
    bytes[i] = Number.parseInt(byte, 16);
  }
  return bytes;
}

export function convertEthAddressToSequencerValidatorAddress(
  ethAddress: HexAddress | undefined,
): SequencerValidatorAddress | undefined {
  if (!ethAddress) {
    return undefined;
  }

  // Remove the '0x' prefix and convert the address to a Buffer
  const addressBytes = hexToBytes(ethAddress.slice(2));

  // Convert the address Buffer to a Bech32 encoded address
  const bech32Address = bech32.encode(hrp, bech32.toWords(addressBytes));

  return bech32Address as SequencerValidatorAddress;
}
