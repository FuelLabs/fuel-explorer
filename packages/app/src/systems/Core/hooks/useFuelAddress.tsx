import { shortAddress } from '@fuels/ui';
import { isB256, isBech32, Address } from 'fuels';
import { useState } from 'react';

export function useFuelAddress(address: string) {
  const isValidAddress = isB256(address) || isBech32(address);
  const [showB256, setShowB56] = useState(false);
  const getAddress = () => {
    const addressInstance = Address.fromString(address);
    return showB256 ? addressInstance.toB256() : addressInstance.toString();
  };
  const fuelAddress = isValidAddress ? getAddress() : '';

  return {
    full: fuelAddress,
    short: shortAddress(fuelAddress),
    toggle: () => setShowB56(!showB256),
  };
}
