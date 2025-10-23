import { Address } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import { ViewModes } from '~/systems/Core/components/ViewMode/constants';

export function TxHeader({
  id,
  isLoading = false,
  viewModes = [ViewModes.Simple, ViewModes.Standard, ViewModes.Advanced],
  className,
  isSimpleDisabled,
  isSimple,
}: {
  className?: string;
  id: string;
  isLoading?: boolean;
  viewModes?: ViewModes[];
  isSimpleDisabled?: boolean;
  isSimple?: boolean;
}) {
  return (
    <PageTitle
      title="Transaction Details"
      className={`${className} flex-col tablet:flex-row tablet:justify-between tablet:items-center gap-4 tablet:gap-0`}
      subtitle={
        isSimple ? null : (
          <>
            <Address full value={id} className="hidden laptop:flex" />
            <Address value={id} className="flex laptop:hidden" />
          </>
        )
      }
    >
      {!isLoading && (
        <div className="w-full tablet:w-auto flex justify-start tablet:justify-end">
          <ViewMode viewModes={viewModes} isSimpleDisabled={isSimpleDisabled} />
        </div>
      )}
    </PageTitle>
  );
}
