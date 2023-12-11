import { Suspense } from 'react';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';
import { TxScreenLoader } from '~/systems/Transaction/component/TxScreen/TxScreenLoader';
import { TxScreen } from '~/systems/Transaction/screens/TxScreen/TxScreen';

type TransactionProps = {
  params: {
    id: string;
  };
  searchParams: {
    view?: ViewModes;
  };
};

export default async function Transaction({
  params: { id },
  searchParams: { view: viewMode = ViewModes.Simple },
}: TransactionProps) {
  return (
    <Suspense fallback={<TxScreenLoader />}>
      <TxScreen id={id} viewMode={viewMode} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
