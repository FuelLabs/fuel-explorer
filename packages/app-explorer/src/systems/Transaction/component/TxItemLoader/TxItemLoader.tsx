import { LoadingBox } from '@fuels/ui';
import { TxItem, TxItemGroup } from '../TxItem/TxItem';

export function TxItemLoader() {
  return (
    <TxItemGroup>
      <TxItem label={<LoadingBox className="h-4 w-16" />}>
        <div className="flex items-center gap-4">
          <LoadingBox className="size-[38px] shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <LoadingBox className="h-[20px] w-28" />
            <LoadingBox className="h-[16px] w-32" />
          </div>
        </div>
      </TxItem>
    </TxItemGroup>
  );
}
