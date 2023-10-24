import { isB256, isBech32, Address } from '@fuel-ts/address';
import { useState } from 'react';
import { useKey } from 'react-use';

import { shortAddress } from '../../utils/helpers';

export function useFuelAddress(address: string) {
  const isValid = isB256(address) || isBech32(address);
  const [isShowingB256, setShowB256] = useState(isB256(address));
  const getAddress = () => {
    const addressInstance = Address.fromString(address);
    return isShowingB256
      ? addressInstance.toB256()
      : addressInstance.toString();
  };
  const fuelAddress = isValid ? getAddress() : address;

  function toggle() {
    if (!isValid) return;
    setShowB256(!isShowingB256);
  }

  useKey((e) => e.metaKey && e.code === 'KeyK', toggle);

  return {
    isValid,
    isShowingB256,
    toggle,
    address: fuelAddress,
    short: shortAddress(fuelAddress),
  };
}
