'use client';

import { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { store } from '~portal/store';
import { useBridge } from '~portal/systems/Bridge/hooks';
import { useFuelAccountConnection } from '~portal/systems/Chains';

import {
  CardList,
  Dialog,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
} from '@fuels/ui';
import { IconArrowLeft, IconCoins } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import {
  useEthAccountConnection,
  useFaucetErc20,
  useSetAddressForm,
} from '../../Chains/eth/hooks';
import { AssetCard } from '../components/AssetCard';
import { useAssets } from '../hooks';
import { getAssetEth, getAssetFuel } from '../utils';

export function AssetsDialog() {
  const classes = styles();
  const {
    handlers: { addAsset: addAssetFuel },
    isConnected: isConnectedFuel,
    wallet,
  } = useFuelAccountConnection();
  const {
    handlers: { addAsset: addAssetEth },
    isConnected: isConnectedEth,
  } = useEthAccountConnection();
  const { handlers: bridgeHandlers } = useBridge();
  const [editable, setEditable] = useState(false);

  const form = useSetAddressForm();

  const assetQuery = useWatch({ name: 'address', control: form.control });

  const {
    assets,
    isLoading,
    isLoadingFaucet,
    isSearchResultsEmpty,
    showAssetList,
  } = useAssets({
    assetQuery,
  });
  const {
    handlers: { faucetErc20 },
  } = useFaucetErc20();

  return (
    <>
      <Dialog.Title>
        <Flex className="items-center gap-3 font-semibold">
          {editable ? (
            <IconButton
              aria-label="Set editable to false"
              variant="link"
              icon={IconArrowLeft}
              onClick={() => setEditable(false)}
            />
          ) : (
            <IconCoins stroke={1} className="text-muted" />
          )}
          {!editable ? 'Select token' : 'Manage token list'}
        </Flex>
      </Dialog.Title>
      <Controller
        name="address"
        control={form.control}
        render={(props) => {
          return (
            <>
              <Input
                className={classes.headerInput()}
                size="3"
                {...props.field}
                placeholder="Type here to search"
              >
                {isLoading && (
                  <Input.Slot side="right">
                    <Spinner />
                  </Input.Slot>
                )}
              </Input>
              {!!isSearchResultsEmpty && (
                <Text>No asset found for your search "{assetQuery}"</Text>
              )}
            </>
          );
        }}
      />
      <CardList isClickable={!editable}>
        {showAssetList &&
          assets.map((asset, i) => {
            const ethAsset = getAssetEth(asset);
            const fuelAsset = getAssetFuel(
              asset,
              wallet?.provider.getChainId(),
            );

            const isFaucetable = !!ethAsset?.address;
            const isETH = !ethAsset?.address;
            const shouldShowAddToWallet =
              !isETH && (isConnectedEth || isConnectedFuel);

            return (
              <AssetCard
                key={`${ethAsset.address || ''}${ethAsset.symbol || ''}${String(
                  i,
                )}`}
                asset={asset}
                isFaucetLoading={isFaucetable && isLoadingFaucet}
                onClick={
                  !editable
                    ? () => {
                        bridgeHandlers.changeAsset({
                          asset,
                        });
                        store.closeOverlay();
                      }
                    : undefined
                }
                onFaucet={
                  isFaucetable && faucetErc20
                    ? () => {
                        faucetErc20({
                          address: ethAsset.address,
                        });
                      }
                    : undefined
                }
                onAddToWallet={
                  shouldShowAddToWallet
                    ? async () => {
                        try {
                          await addAssetEth(ethAsset);
                        } catch (_e) {
                          /* empty */
                        }
                        addAssetFuel(fuelAsset);
                      }
                    : undefined
                }
              />
            );
          })}
      </CardList>
    </>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
    controllerWrapper: 'pb-2 mb-4 mt-2 w-full',
    formControl: 'w-full',
    headerInput: 'my-4',
  },
});
