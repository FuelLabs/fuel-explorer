import { bn } from '@fuel-ts/math';
import type { BN } from '@fuel-ts/math';
import { Address, IconCoins } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

import type { TxAccountType } from '../../types';
import { TxIcon } from '../TxIcon/TxIcon';
import { TxItem } from '../TxItem/TxItem';

export type TxAccountItemProps = {
  type: TxAccountType;
  id: string;
  spent?: BN;
  className?: string;
};

export function TxAccountItem({
  type,
  id,
  spent,
  className,
}: TxAccountItemProps) {
  const { t } = useTranslation();
  return (
    <TxItem
      label={t(`tx.account_type.${type.toLowerCase()}`)}
      className={className}
      trailing={
        spent ? (
          <span className="inline-flex items-center gap-1 text-[14px]">
            <IconCoins aria-hidden size={16} />
            {t('tx.spent', { amount: bn(spent).format() })}
          </span>
        ) : null
      }
    >
      <div className="flex items-center gap-4">
        <TxIcon type={type} />
        <Address value={id} />
      </div>
    </TxItem>
  );
}
