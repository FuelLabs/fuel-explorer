import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { useProvider } from '@fuels/react';
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  Dropdown,
  HStack,
  Input,
  InputAmount,
  LoadingBox,
  LoadingWrapper,
  Text,
  Tooltip,
  VStack,
  shortAddress,
} from '@fuels/ui';
import { IconAlertCircle, IconAlertOctagon } from '@fuels/ui';
import { Address, isB256 } from 'fuels';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { TxChip } from '~/systems/Transaction/component/TxItem/TxChip';
import { getAsset } from '../../actions/get-asset';
import { useSendTransactionDialog } from '../../hooks/useSendTransactionDialog';

type SendTransactionDialogContentProps = {
  balances: GQLBalanceItemFragment[];
};

const ADDRESS_TYPE_KEY: Record<string, string> = {
  account: 'tx.account_type.wallet',
  contract: 'tx.account_type.contract',
  predicate: 'tx.account_type.predicate',
};

function addressTypeName(
  type: string | undefined,
  translate: (key: string) => string,
) {
  if (!type) return '';
  const key = ADDRESS_TYPE_KEY[type.toLowerCase()];
  return key ? translate(key) : type;
}

export function SendTransactionDialogContent({
  balances,
}: SendTransactionDialogContentProps) {
  const { t } = useTranslation();
  const { data, handlers } = useSendTransactionDialog({ balances });
  const [addressError, setAddressError] = useState<string | undefined>(
    undefined,
  );
  const [addressWarning, setAddressWarning] = useState<string | undefined>(
    undefined,
  );
  const {
    hasMultipleAssets,
    balance,
    assetFormat,
    amount,
    assetId,
    asset,
    isUsingMaxBalance,
    isInsufficientBalance,
    destinyAddress,
    isValidTransactionInput,
    isSubmittingTransaction,
    isConfirmingTransaction,
    isBuildingTransactionPage,
  } = data;
  const {
    handleSendTransaction,
    handleSelectAsset,
    setAmount,
    setDestinyAddress,
  } = handlers;

  const { provider } = useProvider();

  const classes = styles({
    assetsType: !hasMultipleAssets ? 'single' : undefined,
  });

  const isLoading = useMemo<boolean>(() => {
    return (
      isSubmittingTransaction ||
      isConfirmingTransaction ||
      isBuildingTransactionPage
    );
  }, [
    isSubmittingTransaction,
    isConfirmingTransaction,
    isBuildingTransactionPage,
  ]);

  const loadingText = useMemo<string>(() => {
    if (isConfirmingTransaction) return t('account.send.confirming');
    if (isBuildingTransactionPage) return t('account.send.redirecting');
    return t('account.send.sending');
  }, [isConfirmingTransaction, isBuildingTransactionPage, t]);

  useEffect(() => {
    const checkAddress = async () => {
      try {
        setAddressError(undefined);
        setAddressWarning(undefined);
        if (isB256(destinyAddress)) {
          const asset = await getAsset({ assetId: destinyAddress });
          if (asset) {
            setAddressError(t('account.send.error_asset_address'));
            return;
          }
          const type = await provider?.getAddressType(destinyAddress);
          if (type !== 'Account') {
            setAddressError(
              t('account.send.error_address_type', {
                type: addressTypeName(type, t),
              }),
            );
            return;
          }
          if (!Address.isChecksumValid(destinyAddress)) {
            setAddressWarning(t('account.send.warning_checksum'));
          }
        }
      } catch (e: any) {
        setAddressError(e?.message);
      }
    };

    checkAddress();
  }, [destinyAddress, provider, t]);

  const inputAmountButtonMaxBalance = (
    <InputAmount.ButtonMaxBalance
      className="text-xs font-normal py-0.5 px-1.5 mr-0 h-5"
      disabled={isUsingMaxBalance}
    >
      {t('account.send.max')}
    </InputAmount.ButtonMaxBalance>
  );

  return (
    <Dialog.Content className="max-w-sm">
      <Dialog.Title>{t('account.send.title')}</Dialog.Title>
      <VStack className="mt-8">
        <label className="w-full mb-1" htmlFor="evm-dialog-destiny-address">
          <Text as="div" mb="1" size="2" weight="bold">
            {t('account.send.to')}
          </Text>
          <Input
            id="evm-dialog-destiny-address"
            placeholder={t('account.send.recipient_placeholder')}
            value={destinyAddress}
            onChange={(e) => setDestinyAddress(e.target.value)}
            size="3"
          />
          {(!!addressError || !!addressWarning) && (
            <Alert color={addressError ? 'red' : 'blue'} className="mt-2">
              <Alert.Text>
                {addressError ? addressError : addressWarning}
              </Alert.Text>
            </Alert>
          )}
        </label>
        <label className="w-full mb-1" htmlFor="evm-dialog-amount">
          <Text as="div" mb="1" size="2" weight="bold">
            {t('account.send.amount')}
          </Text>
          <InputAmount balance={balance || undefined} formatOpts={assetFormat}>
            <InputAmount.Field
              id="evm-dialog-amount"
              value={amount}
              onChange={(val) => setAmount(val || undefined)}
              placeholder="0.00"
              className="py-2.5"
            >
              <InputAmount.Slot className="flex-shrink-0">
                <Dropdown>
                  <Dropdown.Trigger>
                    <InputAmount.CoinSelector
                      asset={{
                        name:
                          asset?.symbol ||
                          shortAddress(asset?.assetId, 4, 2) ||
                          '',
                        imageUrl: asset?.icon || '',
                        address: assetId,
                        suspicious: asset?.suspicious || false,
                        decimals: Number.parseInt(asset?.decimals as string),
                      }}
                      className={classes.trigger()}
                      disabled={false}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {balances.map((balance) => {
                      return (
                        <Dropdown.Item
                          key={balance.assetId}
                          onClick={() => handleSelectAsset(balance.assetId)}
                        >
                          <Avatar
                            src={balance?.icon || ''}
                            fallback=""
                            radius="full"
                            className="w-5 h-5"
                          />
                          {balance?.symbol ||
                            balance?.name ||
                            shortAddress(balance?.assetId)}
                          {Number.parseInt(balance?.decimals as string) ===
                            0 && (
                            <TxChip kind="success">{t('asset.nft_tag')}</TxChip>
                          )}
                          {balance.suspicious && (
                            <Tooltip content={t('asset.suspicious')}>
                              <div className="mx-1">
                                <IconAlertOctagon size={16} color="orange" />
                              </div>
                            </Tooltip>
                          )}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Content>
                </Dropdown>
              </InputAmount.Slot>
              <InputAmount.Slot className="justify-end align-center my-1 basis-full shrink-0">
                <HStack gap="2" justify="end" align="center">
                  <LoadingWrapper
                    loadingEl={<LoadingBox className="w-[64px] h-5" />}
                    regularEl={
                      <InputAmount.Balance
                        color="gray"
                        className="bg-transparent text-xs p-0 self-center text-[var(--fuel-element-low-em)]"
                      />
                    }
                  />
                  {!isUsingMaxBalance ? (
                    inputAmountButtonMaxBalance
                  ) : (
                    <Tooltip
                      content={t('account.send.max_selected')}
                      delayDuration={0}
                    >
                      {inputAmountButtonMaxBalance}
                    </Tooltip>
                  )}
                </HStack>
              </InputAmount.Slot>
            </InputAmount.Field>
            {isInsufficientBalance && !isLoading && (
              <Alert color="red" className="mt-1">
                <Alert.Icon>
                  <IconAlertCircle size="md" />
                </Alert.Icon>
                <Alert.Text>{t('account.send.insufficient')}</Alert.Text>
              </Alert>
            )}
          </InputAmount>
        </label>
      </VStack>
      <HStack className="mt-8" justify="end">
        <Dialog.Close>
          <Button color="gray" variant="ghost">
            {t('account.send.cancel')}
          </Button>
        </Dialog.Close>
        <Button
          onClick={handleSendTransaction}
          disabled={!!addressError || !isValidTransactionInput || isLoading}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          {t('account.send.submit')}
        </Button>
      </HStack>
    </Dialog.Content>
  );
}

const styles = tv({
  slots: {
    trigger: [
      'cursor-pointer gap-2.5 shadow-none pr-0 text-base',
      '[&_.lucide]:ml-[-6px] [&_.lucide]:w-3.5 [&_.lucide]:h-3.5',
    ],
  },
  variants: {
    assetsType: {
      single: {
        trigger: '!cursor-auto [&_.lucide]:hidden',
      },
    },
  },
});
