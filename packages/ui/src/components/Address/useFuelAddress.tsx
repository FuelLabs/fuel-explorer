import { Address, isB256 } from 'fuels';
import { useMemo } from 'react';

import { shortAddress } from '../../utils/helpers';

export type UseFuelAddressOpts = {
  isAccount?: boolean;
  trimLeft?: number;
  trimRight?: number;
};

export function useFuelAddress(address: string, opts: UseFuelAddressOpts = {}) {
  const isValid = isB256(address);

  const value = useMemo(() => {
    if (!isValid) return address;
    const addressInstance = Address.fromString(address);

    return opts.isAccount
      ? addressInstance.toString()
      : addressInstance.toB256();
  }, [address, isValid, opts.isAccount]);

  return {
    isValid,
    address: value,
    short: shortAddress(value, opts.trimLeft, opts.trimRight),
  };
}
