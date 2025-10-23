import {
  Box,
  CardList,
  Dialog,
  Flex,
  IconButton,
  Input,
  ScrollArea,
  Spinner,
  Text,
} from '@fuels/ui';
import { IconArrowLeft, IconCoins } from '@tabler/icons-react';
import { IS_ETH_DEV_CHAIN, IS_ETH_SEPOLIA_CHAIN } from 'app-commons';
import { useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { tv } from 'tailwind-variants';
import { Services, store } from '~portal/store';
import { bridgeSelectors, useBridge } from '~portal/systems/Bridge/hooks';
import { useFromNetworkAssetsBalances } from '~portal/systems/Bridge/hooks/useFromNetworkAssetsBalances';
import { isEthChain, useFuelAccountConnection } from '~portal/systems/Chains';
import {
  useEthAccountConnection,
  useFaucetErc20,
  useSetAddressForm,
} from '../../Chains/eth/hooks';
import { AssetCard } from '../components/AssetCard';
import { useAssets } from '../hooks';
import { getAssetEthCurrentChain } from '../utils';

export function AssetsDialog() {
  const classes = styles();
  const { isConnected: isConnectedFuel } = useFuelAccountConnection();
  const { isConnected: isConnectedEth } = useEthAccountConnection();
  const { handlers: bridgeHandlers } = useBridge();
  const [editable, setEditable] = useState(false);
  const fromNetwork = store.useSelector(
    Services.bridge,
    bridgeSelectors.fromNetwork,
  );
  const isEthereumNetwork = useMemo(
    () => isEthChain(fromNetwork),
    [fromNetwork],
  );
  const form = useSetAddressForm();

  const assetQuery = useWatch({ name: 'address', control: form.control });
  const { balances } = useFromNetworkAssetsBalances();

  const {
    assets,
    isLoading,
    isLoadingFaucet,
    isSearchResultsEmpty,
    showAssetList,
    handlers,
  } = useAssets({
    assetQuery,
    balances,
    isEthereumNetwork,
  });
  const {
    handlers: { faucetErc20 },
  } = useFaucetErc20();

  return (
    <>
      <Dialog.Title>
        <Flex className="items-center gap-3 font-semibold text-xl">
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
      <Box className={classes.contentWrapper()}>
        {showAssetList && (
          <ScrollArea
            className={classes.contentScrollable()}
            scrollbars="vertical"
          >
            <CardList isClickable={!editable} gap="2">
              {assets.map((asset, i) => {
                const ethAsset = getAssetEthCurrentChain(asset);
                const isEth = ethAsset?.symbol === 'ETH';

                // if the asset doesn't have address in this network, hide it
                if (!isEth && !ethAsset?.address && asset.symbol !== 'FUEL') {
                  return <></>;
                }

                const isSepoliaFaucetable =
                  IS_ETH_SEPOLIA_CHAIN && ethAsset?.symbol === 'USDe';
                const isDevFaucetable = IS_ETH_DEV_CHAIN && !!ethAsset?.address;

                const isFaucetable = isSepoliaFaucetable || isDevFaucetable;
                const shouldShowAddToWallet =
                  !isEth && (isConnectedEth || isConnectedFuel);

                return (
                  <AssetCard
                    key={`${ethAsset.address || ''}${
                      ethAsset.symbol || ''
                    }${String(i)}`}
                    asset={asset}
                    isFaucetLoading={isFaucetable && isLoadingFaucet}
                    external={isEth}
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
                              asset,
                              address: ethAsset.address,
                            });
                          }
                        : undefined
                    }
                    onAddToWallet={
                      shouldShowAddToWallet
                        ? () => handlers.addAssetToWallet(asset)
                        : undefined
                    }
                  />
                );
              })}
            </CardList>
          </ScrollArea>
        )}
      </Box>
    </>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
    controllerWrapper: 'pb-2 mb-4 mt-2 w-full',
    contentWrapper: 'mr-[-12px]',
    contentScrollable: 'h-[535px] pr-[12px]',
    formControl: 'w-full',
    headerInput: 'my-4',
  },
});
