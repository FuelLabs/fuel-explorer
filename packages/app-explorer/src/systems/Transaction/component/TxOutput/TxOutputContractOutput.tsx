import type { GQLContractOutput } from '@fuel-explorer/graphql';
import { Address } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

import { Routes } from '~/routes';
import { TxContractIcon } from '../TxContractIcon/TxContractIcon';
import { TxIcon } from '../TxIcon/TxIcon';
import { TxItem } from '../TxItem/TxItem';
import { txIconTypeMap, typeNameMap } from './constants';
import type { TxOutputProps } from './types';

export function TxOutputContractOutput({
  output,
  getContractByIndex,
}: Pick<TxOutputProps<GQLContractOutput>, 'output' | 'getContractByIndex'>) {
  const { t } = useTranslation();
  const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Contract';
  const contractData = getContractByIndex(Number(output.inputIndex));

  return (
    <TxItem
      label={t(typeNameMap?.[output?.__typename] ?? 'tx.output_type.unknown')}
      details={
        <>
          <span className="fuel-label">{t('tx.input')}</span>
          <p className="m-0 font-mono text-[12px] text-[var(--fuel-element-low-em)]">
            {t('tx.index')} {output.inputIndex}
          </p>
        </>
      }
    >
      <div className="flex items-center gap-4">
        <TxContractIcon contractId={contractData?.contractId}>
          <TxIcon status="Submitted" type={txIconType} />
        </TxContractIcon>
        {!!contractData?.contractId && (
          <Address
            prefix={t('tx.id_prefix')}
            value={contractData.contractId}
            linkProps={{
              href: Routes.contractMintedAssets(contractData.contractId),
            }}
          />
        )}
      </div>
    </TxItem>
  );
}
