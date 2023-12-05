import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import type { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { getTx } from '../../actions/get-tx';
import { TxScreenAdvanced } from '../../component/TxScreen/TxScreenAdvanced';
import { TxScreenSimple } from '../../component/TxScreen/TxScreenSimple';

type TxScreenProps = {
  id: string;
  viewMode?: ViewModes;
};

export async function TxScreenSimpleSync({ id }: TxScreenProps) {
  const tx = await getTx({ id });
  if (!tx) return notFound();
  // Revalidate path if transaction will change in the future
  if (tx.status?.__typename === 'SubmittedStatus') {
    revalidatePath(`/tx/${id}/[mode]`);
  }
  return <TxScreenSimple transaction={tx} />;
}

export async function TxScreenAdvancedSync({ id }: TxScreenProps) {
  const tx = await getTx({ id });
  if (!tx) return notFound();
  // Revalidate path if transaction will change in the future
  if (tx.status?.__typename === 'SubmittedStatus') {
    revalidatePath(`/tx/${id}/[mode]`);
  }
  return <TxScreenAdvanced transaction={tx} />;
}
