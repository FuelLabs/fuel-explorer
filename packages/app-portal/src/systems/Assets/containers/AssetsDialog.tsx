import { Form } from '@fuel-ui/react';
import { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { VITE_ETH_ERC20 } from '~/config';
import { store } from '~/store';
import { useBridge } from '~/systems/Bridge/hooks';
import { useFuelAccountConnection } from '~/systems/Chains';

import {
  CardList,
  Dialog,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
} from '@fuels/ui';
import { IconArrowLeft } from '@tabler/icons-react';
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
      <Flex align="center" className={classes.controllerWrapper()}>
        <Controller
          name="address"
          control={form.control}
          render={(props) => {
            return (
              <Form.Control className={classes.formControl()}>
                <Input className={classes.headerInput()}>
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
                  <Form.HelperText>{`No asset found for your search "${assetQuery}"`}</Form.HelperText>
                )}
              </Form.Control>
            );
          }}
        />
      </Flex>
      <CardList isClickable={!editable}>
        {showAssetList &&
          assets.map((asset, i) => {
            const ethAsset = getAssetEth(asset);
            const fuelAsset = getAssetFuel(asset);

            const isFaucetable = ethAsset?.address === VITE_ETH_ERC20;
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
                        } catch (e) {
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
    controllerWrapper: 'pb-2 mb-4',
    formControl: 'w-full',
    headerInput: 'text-xs',
  },
});
