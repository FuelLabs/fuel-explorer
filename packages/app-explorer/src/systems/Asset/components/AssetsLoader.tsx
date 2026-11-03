import { BalanceItem } from '~/systems/Core/components/BalanceItem/BalanceItem';
import { BalanceList } from '~/systems/Core/components/BalanceItem/BalanceList';

const PER_PAGE = 4;

export function AssetsLoader() {
  return (
    <BalanceList>
      {[...Array(PER_PAGE)].map((_, i) => (
        <BalanceItem key={i} isLoading item={{ assetId: '0x00' } as any} />
      ))}
    </BalanceList>
  );
}
