import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import { getTx } from '../actions/get-tx';
import { TxScreenAdvanced } from '../component/TxScreen/TxScreenAdvanced';
import type { TxRouteParams } from '../types';

export async function TxScreenAdvancedSync({ id }: TxRouteParams) {
  const tx = await getTx({ id });
  if (!tx) return notFound();
  // Revalidate path if transaction will change in the future
  if (tx.status?.__typename === 'SubmittedStatus') {
    revalidatePath(`/tx/${id}/[mode]`);
  }
  return <TxScreenAdvanced transaction={tx} />;
}
