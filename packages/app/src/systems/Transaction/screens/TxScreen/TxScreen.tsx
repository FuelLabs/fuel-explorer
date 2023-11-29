import { notFound } from 'next/navigation';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';

import { getTx } from '../../actions/get-tx';
import { TxScreenAdvanced } from '../../component/TxScreen/TxScreenAdvanced';
import { TxScreenSimple } from '../../component/TxScreen/TxScreenSimple';
import { TxTitle } from '../../component/TxTitle/TxTitle';

type TxScreenProps = {
  id: string;
  viewMode?: ViewModes;
};

export async function TxScreen({ id, viewMode }: TxScreenProps) {
  const tx = await getTx({ id });
  if (!tx) return notFound();

  return (
    <>
      <TxTitle id={id} />
      {viewMode === ViewModes.Simple && <TxScreenSimple transaction={tx} />}
      {viewMode === ViewModes.Advanced && <TxScreenAdvanced transaction={tx} />}
    </>
  );
}
