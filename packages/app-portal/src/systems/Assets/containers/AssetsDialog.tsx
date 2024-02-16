import { cssObj } from '@fuel-ui/css';
import {
  Box,
  CardList,
  Dialog,
  Form,
  IconButton,
  Input,
  Spinner,
  Text,
} from '@fuel-ui/react';
import { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { VITE_ETH_ERC20 } from '~/config';
import { store } from '~/store';
import { useBridge } from '~/systems/Bridge/hooks';
import { useFuelAccountConnection } from '~/systems/Chains';

import {
  useEthAccountConnection,
  useFaucetErc20,
  useSetAddressForm,
} from '../../Chains/eth/hooks';
import { AssetCard } from '../components/AssetCard';
import { useAssets } from '../hooks';
import { getAssetEth, getAssetFuel } from '../utils';

export function AssetsDialog() {
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
      <Dialog.Heading>
        <Box.Flex gap="$4" justify="start">
          {editable && (
            <IconButton
              aria-label="Set editable to false"
              variant="link"
              icon="ArrowLeft"
              onClick={() => setEditable(false)}
            />
          )}
          <Text color="intentsBase12" fontSize="sm">
            {!editable ? 'Select token' : 'Manage token list'}
          </Text>
        </Box.Flex>
      </Dialog.Heading>
      <Dialog.Description>
        <Box.Flex align="center" css={styles.controllerWrapper}>
          <Controller
            name="address"
            control={form.control}
            render={(props) => {
              return (
                <Form.Control css={{ width: '$full' }}>
                  <Input size="md" css={styles.headerInput}>
                    <Input.Field
                      {...props.field}
                      placeholder="Type here to search"
                    />
                    {isLoading && (
                      <Input.ElementRight>
                        <Spinner />
                      </Input.ElementRight>
                    )}
                  </Input>
                  {!!isSearchResultsEmpty && (
                    <Form.HelperText>{`No asset found for your search "${assetQuery}"`}</Form.HelperText>
                  )}
                </Form.Control>
              );
            }}
          />
        </Box.Flex>
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
                  key={`${ethAsset.address || ''}${
                    ethAsset.symbol || ''
                  }${String(i)}`}
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
      </Dialog.Description>
      {/*
      Keeping this comment here as we may need this component / design later when refactoring assets package
      {!editable && (
        <Dialog.Footer css={styles.dialogFooter}>
          <Button variant="link" onClick={() => setEditable(true)}>
            <Icon icon="Edit" />
            <Text color="intentsBase10">Manage token list</Text>
          </Button>
        </Dialog.Footer>
      )} */}
    </>
  );
}

const styles = {
  actionButton: cssObj({
    width: '100%',
  }),
  controllerWrapper: cssObj({
    pb: '$2',
  }),
  dialogFooter: cssObj({
    borderTop: '1px solid $border',
    justifyContent: 'center',
    paddingTop: '$2',
  }),
  headerInput: cssObj({
    fontSize: '$sm',
  }),
};
