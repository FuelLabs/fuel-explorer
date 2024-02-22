import { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { store } from '~portal/store';
import { useBridge } from '~portal/systems/Bridge/hooks';
import { useFuelAccountConnection } from '~portal/systems/Chains';

import { CardList, Dialog, IconButton, Input, Spinner, Text } from '@fuels/ui';
import { IconArrowLeft } from '@tabler/icons-react';
import { ETH_ERC20 } from 'app-commons';
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
      <Dialog.Close />
      <Dialog.Title>
        {editable && (
          <IconButton
            aria-label="Set editable to false"
            variant="link"
            icon={IconArrowLeft}
            onClick={() => setEditable(false)}
          />
        )}
        {!editable ? 'Select token' : 'Manage token list'}
      </Dialog.Title>
      <Controller
        name="address"
        control={form.control}
        render={(props) => {
          return (
            <>
              <Input className={classes.headerInput()} size="3">
                <Input.Field
                  {...props.field}
                  placeholder="Type here to search"
                />
                {isLoading && (
                  <Input.Slot>
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
            const fuelAsset = getAssetFuel(asset);

            const isFaucetable = ethAsset?.address === ETH_ERC20;
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
