import { bech32 } from 'bech32';
import type { SequencerValidatorAddress } from '~staking/systems/Core';

export function convertSequencerValidatorAddressToEthAddress(
  bech32Address: SequencerValidatorAddress,
) {
  // Decode the Bech32 address
  const { words } = bech32.decode(bech32Address);

  // Convert from 5-bit words to 8-bit bytes
  const bytes = bech32.fromWords(words);

  // Convert the byte array to a hexadecimal string
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const ethAddress = `0x${hex}` as const;

  return ethAddress;
}
