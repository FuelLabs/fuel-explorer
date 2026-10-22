import type { GQLContractCreated } from '@fuel-explorer/graphql';
import { Address } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

import { Routes } from '~/routes';

import { TxContractIcon } from '../TxContractIcon/TxContractIcon';
import { TxIcon } from '../TxIcon/TxIcon';
import { TxItem } from '../TxItem/TxItem';
import { txIconTypeMap, typeNameMap } from './constants';
import type { TxOutputProps } from './types';

export function TxOutputContractCreated({
  output,
}: Pick<TxOutputProps<GQLContractCreated>, 'output'>) {
  const { t } = useTranslation();
  const contractId = output.contract;
  const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Contract';

  return (
    <TxItem
      label={t(typeNameMap?.[output?.__typename] ?? 'tx.output_type.unknown')}
    >
      <div className="flex items-center gap-4">
        <TxContractIcon contractId={contractId}>
          <TxIcon status="Success" type={txIconType} />
        </TxContractIcon>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-medium text-heading">
            {t('tx.contract_created')}
          </span>
          <Address
            prefix={t('tx.id_prefix')}
            value={contractId}
            linkProps={{
              href: Routes.contractMintedAssets(contractId),
            }}
          />
        </div>
      </div>
    </TxItem>
  );
}
