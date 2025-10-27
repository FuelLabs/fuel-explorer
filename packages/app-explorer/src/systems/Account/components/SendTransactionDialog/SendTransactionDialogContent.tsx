import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { useProvider } from '@fuels/react';
import {
  Alert,
  Avatar,
  Badge,
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
import { IconAlertCircle, IconAlertOctagon } from '@tabler/icons-react';
import { Address, isB256 } from 'fuels';
import { useEffect, useMemo, useState } from 'react';
import { tv } from 'tailwind-variants';
import { getAsset } from '../../actions/get-asset';
import { useSendTransactionDialog } from '../../hooks/useSendTransactionDialog';

type SendTransactionDialogContentProps = {
  balances: GQLBalanceItemFragment[];
};

export function SendTransactionDialogContent({
  balances,
}: SendTransactionDialogContentProps) {
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
    if (isConfirmingTransaction) return 'Confirming (2/3)';
    if (isBuildingTransactionPage) return 'Redirecting (3/3)';
    return 'Sending (1/3)';
  }, [isConfirmingTransaction, isBuildingTransactionPage]);

  useEffect(() => {
    const checkAddress = async () => {
      try {
        setAddressError(undefined);
        setAddressWarning(undefined);
        if (isB256(destinyAddress)) {
          const asset = await getAsset({ assetId: destinyAddress });
          if (asset) {
            setAddressError('You cannot send assets to an asset address.');
            return;
          }
          const type = await provider?.getAddressType(destinyAddress);
          if (type !== 'Account') {
            setAddressError(`You cannot send assets to a ${type} address.`);
            return;
          }
          if (!Address.isChecksumValid(destinyAddress)) {
            setAddressWarning(
              "We couldn't verify the address. Make sure you are sending to a valid address.",
            );
          }
        }
      } catch (e: any) {
        setAddressError(e?.message);
      }
    };

    checkAddress();
  }, [destinyAddress, provider]);

  const inputAmountButtonMaxBalance = (
    <InputAmount.ButtonMaxBalance
      className="text-xs font-normal py-0.5 px-1.5 mr-0 h-5"
      disabled={isUsingMaxBalance}
    >
      Max
    </InputAmount.ButtonMaxBalance>
  );

  return (
    <Dialog.Content className="max-w-sm">
      <Dialog.Title>Send Asset</Dialog.Title>
      <VStack className="mt-8">
        <label className="w-full mb-1" htmlFor="evm-dialog-destiny-address">
          <Text as="div" mb="1" size="2" weight="bold">
            To
          </Text>
          <Input
            id="evm-dialog-destiny-address"
            placeholder="Enter the recipient address"
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
            Amount
          </Text>
          <InputAmount balance={balance || undefined} formatOpts={assetFormat}>
            <InputAmount.Field
              id="evm-dialog-amount"
              value={amount}
              color="green"
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
                            <Badge variant="ghost" color="green" size="1">
                              NFT
                            </Badge>
                          )}
                          {balance.suspicious && (
                            <Tooltip content="This asset is flagged as suspicious. It may be mimicking another asset. Proceed with caution.">
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
                        className="bg-transparent text-xs p-0 self-center text-muted"
                      />
                    }
                  />
                  {!isUsingMaxBalance ? (
                    inputAmountButtonMaxBalance
                  ) : (
                    <Tooltip
                      content="You have selected the max balance"
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
                <Alert.Text>
                  Insufficient balance, please inform an amount lower or equal
                  to your balance.
                </Alert.Text>
              </Alert>
            )}
          </InputAmount>
        </label>
      </VStack>
      <HStack className="mt-8" justify="end">
        <Dialog.Close>
          <Button color="gray" variant="ghost">
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          onClick={handleSendTransaction}
          disabled={!!addressError || !isValidTransactionInput || isLoading}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          Send
        </Button>
      </HStack>
    </Dialog.Content>
  );
}

const styles = tv({
  slots: {
    trigger: [
      'cursor-pointer gap-2.5 shadow-none pr-0 text-base',
      '[&_.tabler-icon]:ml-[-6px] [&_.tabler-icon]:w-3.5 [&_.tabler-icon]:h-3.5',
    ],
  },
  variants: {
    assetsType: {
      single: {
        trigger: '!cursor-auto [&_.tabler-icon]:hidden',
      },
    },
  },
});
