import { Address, isB256, isBech32 } from '@fuel-ts/address';
import { useMemo, useState } from 'react';
import { useKey } from 'react-use';

import { shortAddress } from '../../utils/helpers';

export type UseFuelAddressOpts = {
  fixed?: 'bech32' | 'b256';
  trimLeft?: number;
  trimRight?: number;
};

export function useFuelAddress(address: string, opts: UseFuelAddressOpts = {}) {
  const isValid = isB256(address) || isBech32(address);
  const [isShowingB256, setShowB256] = useState(isB256(address));

  const value = useMemo(() => {
    if (!isValid) return address;
    const addressInstance = Address.fromString(address);
    if (opts.fixed === 'bech32') return addressInstance.toString();
    if (opts.fixed === 'b256') return addressInstance.toB256();
    return isShowingB256
      ? addressInstance.toB256()
      : addressInstance.toString();
  }, [address, isValid, isShowingB256, opts.fixed]);

  function toggle() {
    if (!isValid || opts.fixed) return;
    setShowB256(!isShowingB256);
  }

  useKey((e) => {
    if (opts.fixed) return false;
    return e.metaKey && e.code === 'KeyK';
  }, toggle);

  return {
    isValid,
    isShowingB256,
    toggle,
    address: value,
    short: shortAddress(value, opts.trimLeft, opts.trimRight),
  };
}
