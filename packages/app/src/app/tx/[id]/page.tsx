import { Suspense } from 'react';
import { ViewModes } from '~/systems/Core/components/ViewMode/ViewMode';
import { TxScreen } from '~/systems/Transaction/screens/TxScreen/TxScreen';
import { TxScreenSkeleton } from '~/systems/Transaction/screens/TxScreen/TxScreenSkeleton';

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
    <Suspense fallback={<TxScreenSkeleton />}>
      <TxScreen id={id} viewMode={viewMode} />
    </Suspense>
  );
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
