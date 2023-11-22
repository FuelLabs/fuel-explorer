/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { TxTitle } from '../TxTitle/TxTitle';

import { TxScreenSimple } from './TxScreenSimple';

export function TxScreenLoader() {
  return (
    <>
      <TxTitle isLoading id={'0x'} />
      <TxScreenSimple isLoading transaction={{} as any} />
    </>
  );
}
