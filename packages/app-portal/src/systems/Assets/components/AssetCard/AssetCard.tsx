import { Asset, CardList, Flex, IconButton, useBreakpoints } from '@fuels/ui';
import { IconCoin } from '@fuels/ui';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import type { FilteredAsset } from '~portal/systems/Assets/types';

type AssetCardProps = {
  asset: FilteredAsset;
  onAdd?: () => void;
  onClick?: () => void;
  onRemove?: () => void;
  onFaucet?: () => void;
  onAddToWallet?: () => void;
  external?: boolean;
  isFaucetLoading?: boolean;
  isRemoveDisabled?: boolean;
  removeToolTip?: string;
  style?: CSSProperties;
};

export const AssetCard = ({
  asset,
  onAdd: _onAdd,
  onFaucet,
  isFaucetLoading,
  onClick,
  onRemove: _onRemove,
  onAddToWallet,
  external,
  style,
}: AssetCardProps) => {
  const { t } = useTranslation();
  const classes = styles();
  const { isMobile } = useBreakpoints();

  function handleButtonClick(
    e: React.MouseEvent<HTMLButtonElement>,
    call: Function,
  ) {
    e.stopPropagation();
    call();
  }

  const shouldShowFaucet = !!onFaucet;
  const showAddToWallet = !external && !!onAddToWallet;
  const hasBalance = !!asset.balance && asset.balance !== '0.000';
  return (
    <CardList.Item
      onClick={onClick}
      style={style}
      className={classes.cardItem({ disabled: !hasBalance })}
    >
      <Flex justify="between" flexGrow="1" align="center">
        <Flex gap="3" align="center">
          <Asset asset={asset} iconSize={isMobile ? 30 : 38}>
            <Asset.Icon />
          </Asset>
          <Flex direction="column" gap="1">
            <span
              className={classes.assetName()}
              aria-label={t('portal.assets.name_label', {
                symbol: asset.symbol,
              })}
            >
              {asset.name || t('portal.assets.unnamed')}
            </span>
            <span
              className={classes.assetSymbol()}
              aria-label={t('portal.assets.symbol_label', {
                symbol: asset.symbol,
              })}
            >
              {asset.symbol}
            </span>
          </Flex>
        </Flex>
        <Flex gap="3" align="center">
          {hasBalance && (
            <span
              data-showing-faucet={shouldShowFaucet}
              data-showing-add-to-wallet={showAddToWallet}
              className="fuel-stat-sm"
              aria-label={t('portal.assets.balance_label', {
                symbol: asset.symbol,
              })}
            >
              {asset.balance !== '0.000' ? asset.balance : '-'}
            </span>
          )}
          {shouldShowFaucet && (
            <IconButton
              aria-label={t('portal.assets.faucet_label', {
                symbol: asset.symbol,
              })}
              variant="ghost"
              color="gray"
              icon={IconCoin}
              isLoading={isFaucetLoading}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleButtonClick(e, onFaucet)
              }
              className={classes.actionIcon()}
            />
          )}
        </Flex>
      </Flex>
    </CardList.Item>
  );
};

const styles = tv({
  slots: {
    assetName: 'text-base leading-5 text-heading',
    assetSymbol: 'fuel-label !leading-4',
    cardItem:
      'fuel-appear flex-1 items-center gap-6 p-3 [animation-delay:var(--fuel-enter-delay,0ms)] fuel-[HStack]:justify-between',
    actionIcon: 'm-[2px] p-[2px] text-heading',
  },
  variants: {
    disabled: {
      true: {
        cardItem: 'bg-[var(--fuel-muted)]',
      },
    },
  },
});
