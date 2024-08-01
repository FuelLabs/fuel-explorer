import type { Asset as FuelsAsset } from '@fuel-ts/account';
import { Asset, CardList, Flex, IconButton, Text } from '@fuels/ui';
import { IconCoin, IconWallet } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';

type AssetCardProps = {
  asset: FuelsAsset;
  onAdd?: () => void;
  onClick?: () => void;
  onRemove?: () => void;
  onFaucet?: () => void;
  onAddToWallet?: () => void;
  isFaucetLoading?: boolean;
  isRemoveDisabled?: boolean;
  removeToolTip?: string;
};

export const AssetCard = ({
  asset,
  onAdd: _onAdd,
  onFaucet,
  isFaucetLoading,
  onClick,
  onRemove: _onRemove,
  onAddToWallet,
}: AssetCardProps) => {
  const classes = styles();

  function handleButtonClick(
    e: React.MouseEvent<HTMLButtonElement>,
    call: Function,
  ) {
    e.stopPropagation();
    call();
  }

  return (
    <CardList.Item onClick={onClick} className={classes.cardItem()}>
      <Flex gap="3" align="center">
        <Asset asset={asset} iconSize={24}>
          <Asset.Icon />
        </Asset>
        <Flex direction="column" gap="0">
          <Text
            className={classes.assetSymbol()}
            aria-label={`${asset.symbol} symbol`}
          >
            {asset.symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex gap="2">
        {onFaucet && (
          <IconButton
            aria-label="Faucet Eth Asset"
            variant="link"
            icon={IconCoin}
            isLoading={isFaucetLoading}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleButtonClick(e, onFaucet)
            }
            className={classes.actionIcon()}
          />
        )}
        {onAddToWallet && (
          <IconButton
            aria-label="Add Asset To Wallet"
            variant="link"
            icon={IconWallet}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleButtonClick(e, onAddToWallet)
            }
            className={classes.actionIcon()}
          />
        )}
      </Flex>
    </CardList.Item>
  );
};

const styles = tv({
  slots: {
    assetWrapper: 'w-full',
    assetSymbol: 'text-heading',
    cardItem: 'p-3 gap-6 items-center fuel-[HStack]:justify-between',
    actionIcon: 'p-[2px] m-[2px] text-heading',
  },
});
