import { Address, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';

import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockHeader({
  id,
  isLoading,
}: {
  id: string | null | undefined;
  isLoading?: boolean;
}) {
  return (
    <PageTitle
      title="Block"
      subtitle={
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={
            <LoadingBox className="w-[101px] laptop:w-[514px]  h-3 my-1" />
          }
          regularEl={
            //
            isValidAddress(id) ? (
              <Address full value={id || ''} isAccount />
            ) : (
              <>#{id}</>
            )
          }
        />
      }
    >
      <ViewMode />
    </PageTitle>
  );
}
