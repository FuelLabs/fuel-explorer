import { Address, Hex32 } from '@fuels/ui';
import { findAssetBySymbol } from 'app-commons';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';

import { Routes } from '~/routes';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import { getAssetFuelCurrentChain } from '~portal/systems/Assets/utils/network';
import { TxAmount } from '../../TxItem/TxAmount';
import { TxItem } from '../../TxItem/TxItem';
import { styles } from '../TxInputContract/styles';
import type { TxInputMessageProps } from './types';

export function TxInputMessage({ input }: TxInputMessageProps) {
  const { t } = useTranslation();
  const { sender, recipient, data, nonce } = input;
  const amount = input.amount;
  if (!sender || !recipient) return null;
  const classes = styles();
  const ethAsset = findAssetBySymbol('ETH');
  let decimals = '';
  if (ethAsset) {
    const currentChain = getAssetFuelCurrentChain(ethAsset);
    decimals = `${currentChain.decimals}`;
  }

  return (
    <TxItem
      label={t('tx.input_type.message')}
      trailing={
        amount ? (
          <TxAmount
            hideIcon
            hideSymbol
            value={bn(amount)}
            decimals={decimals}
          />
        ) : null
      }
      details={
        <>
          <Hex32
            prefix={t('tx.nonce_prefix')}
            value={nonce}
            className={classes.contractAddress()}
          />
          <p className="m-0 break-all font-mono text-[12px] leading-normal text-[var(--fuel-element-low-em)]">
            {t('tx.data_prefix')} {data}
          </p>
        </>
      }
    >
      <div className="flex items-center gap-4">
        {Number(amount) > 0 && ethAsset ? (
          <img
            src={ethAsset.icon}
            width={38}
            height={38}
            alt={ethAsset.name}
            className="rounded-full"
          />
        ) : (
          <TxIcon type="Message" status="Submitted" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Address
            value={sender}
            prefix={t('tx.sender_prefix')}
            linkProps={{
              href: Routes.accountAssets(sender),
            }}
          />
          <Address
            value={recipient}
            prefix={t('tx.recipient_prefix')}
            linkProps={{
              href: Routes.accountAssets(recipient),
            }}
            isAccount
          />
        </div>
      </div>
    </TxItem>
  );
}
