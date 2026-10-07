import { Address } from '@fuels/ui';
import { Routes as CommonRoutes } from 'app-commons';
import { useTranslation } from 'react-i18next';
import { Routes } from '~/routes';
import { TxContractIcon } from '../../TxContractIcon/TxContractIcon';
import { TxIcon } from '../../TxIcon/TxIcon';
import { TxItem } from '../../TxItem/TxItem';
import { styles } from './styles';
import type { TxInputContractProps } from './types';

export function TxInputContract({ input }: TxInputContractProps) {
  const { t } = useTranslation();
  const { utxoId, balanceRoot, txPointer, contractId = '' } = input;
  const classes = styles();

  return (
    <TxItem
      label={t('tx.input_type.contract')}
      details={
        <>
          {!!contractId && (
            <Address
              prefix={t('tx.id_prefix')}
              value={contractId}
              className={classes.contractAddress()}
              linkProps={{
                href: Routes.contractCode(contractId),
              }}
            />
          )}
          <Address
            prefix={t('tx.utxo_id_prefix')}
            value={utxoId}
            className={classes.contractAddress()}
          />
          {!!contractId && (
            <Address
              prefix={t('tx.balance_root_prefix')}
              value={balanceRoot}
              className={classes.contractAddress()}
              linkProps={{
                href: Routes.contractMintedAssets(contractId),
              }}
            />
          )}
          <p className="m-0 font-mono text-[12px] text-[var(--fuel-element-low-em)]">
            {t('tx.tx_pointer')} {txPointer}
          </p>
        </>
      }
    >
      <div className="flex items-center gap-4">
        <TxContractIcon contractId={contractId}>
          <TxIcon type="ContractCall" status="Submitted" />
        </TxContractIcon>
        <div className="flex min-w-0 flex-1 flex-col">
          {!!contractId && (
            <Address
              prefix={t('tx.address_prefix')}
              value={contractId}
              linkProps={{
                href: Routes.contractMintedAssets(contractId),
              }}
            />
          )}
          <Address
            prefix={t('tx.utxo_id_prefix')}
            value={utxoId}
            linkProps={{
              href: CommonRoutes.txSimple(utxoId?.slice(0, -4)),
            }}
          />
        </div>
      </div>
    </TxItem>
  );
}
