import { Address, isB256, isBech32 } from 'fuels';

export function parseAddressParam(id?: string | null) {
  const isValid = id && (isB256(id) || isBech32(id));
  if (!id || !isValid) {
    throw new Error('Invalid address');
  }

  const address = Address.fromString(id).toB256();
  return address;
}
