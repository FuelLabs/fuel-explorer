import { Address, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';

import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockHeader({
  id,
  isLoading,
}: {
  id: string | null | undefined;
  isLoading?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <PageTitle
      title={t('block.title')}
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
