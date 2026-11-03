import {
  Box,
  CardList,
  Dialog,
  Flex,
  IconButton,
  ScrollArea,
  Spinner,
} from '@fuels/ui';
import { IconArrowLeft, IconSearch } from '@fuels/ui';
import { IS_ETH_DEV_CHAIN, IS_ETH_SEPOLIA_CHAIN } from 'app-commons';
import { type CSSProperties, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  // If the asset doesn't have an address in this network, hide it.
  const visibleAssets = assets.flatMap((asset) => {
    const ethAsset = getAssetEthCurrentChain(asset);
    const isEth = ethAsset?.symbol === 'ETH';
    if (!isEth && !ethAsset?.address && asset.symbol !== 'FUEL') return [];
    return [{ asset, ethAsset, isEth }];
  });

  return (
    <>
      <Dialog.Title className="mb-0 pr-10">
        <Flex className="fuel-label items-center gap-3 text-[var(--fuel-element-high-em)]">
          {editable && (
            <IconButton
              aria-label={t('portal.assets.back')}
              variant="link"
              icon={IconArrowLeft}
              onClick={() => setEditable(false)}
            />
          )}
          {!editable
            ? t('portal.assets.select_token')
            : t('portal.assets.manage_token_list')}
        </Flex>
      </Dialog.Title>
      <Controller
        name="address"
        control={form.control}
        render={(props) => {
          return (
            <>
              <label className={classes.search()}>
                <IconSearch
                  size={16}
                  stroke={1.75}
                  className={classes.searchIcon()}
                />
                <input
                  type="text"
                  autoComplete="off"
                  className={classes.input()}
                  {...props.field}
                  placeholder={t('portal.assets.search_placeholder')}
                  aria-label={t('portal.assets.search_placeholder')}
                />
                <span
                  className={classes.spinnerSlot()}
                  data-visible={isLoading}
                >
                  <Spinner />
                </span>
              </label>
              {!!isSearchResultsEmpty && (
                <p className={classes.empty()}>
                  {t('portal.assets.no_asset_found', { query: assetQuery })}
                </p>
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
              {visibleAssets.map(({ asset, ethAsset, isEth }, i) => {
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
                    style={enterDelay(i)}
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

// Rows enter one after another, capped so a long list does not drag.
const enterDelay = (index: number) =>
  ({ '--fuel-enter-delay': `${Math.min(index, 8) * 30}ms` }) as CSSProperties;

const styles = tv({
  slots: {
    contentWrapper: 'mr-[-12px]',
    contentScrollable: 'max-h-[min(535px,60dvh)] pr-[12px]',
    search:
      'group relative my-4 flex h-11 items-center border border-[var(--fuel-line)] bg-transparent focus-within:border-[var(--fuel-focus)] focus-within:outline focus-within:outline-1 focus-within:outline-[var(--fuel-focus)]',
    searchIcon:
      'ml-4 shrink-0 text-[var(--fuel-element-low-em)] transition-colors duration-200 group-focus-within:text-[var(--fuel-brand-text)] motion-reduce:transition-none',
    input: [
      'h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-[16px] text-heading tablet:text-[13px] outline-none',
      'placeholder:text-[var(--fuel-element-low-em)]',
    ],
    spinnerSlot:
      'mr-3 flex shrink-0 opacity-0 transition-opacity duration-150 data-[visible=true]:opacity-100 motion-reduce:transition-none',
    empty:
      'fuel-appear m-0 mb-4 text-base text-[var(--fuel-element-low-em)] [overflow-wrap:anywhere]',
  },
});
