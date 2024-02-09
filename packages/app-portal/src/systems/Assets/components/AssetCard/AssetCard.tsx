import type { Asset as FuelsAsset } from '@fuels/assets';
import { Asset, CardList, Flex, IconButton, Text } from '@fuels/ui';
import {
  IconCirclePlus,
  IconCoin,
  IconSquareRoundedX,
  IconWallet,
} from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import { RemoveAssetDialog } from '~/systems/Chains/eth/components';

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
  onAdd,
  onFaucet,
  isFaucetLoading,
  onClick,
  onRemove,
  onAddToWallet,
}: AssetCardProps) => {
  const classes = styles();

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
            onClick={onFaucet}
            className={classes.actionIcon()}
          />
        )}
        {onAddToWallet && (
          <IconButton
            aria-label="Add Asset To Wallet"
            variant="link"
            icon={IconWallet}
            onClick={onAddToWallet}
            className={classes.actionIcon()}
          />
        )}
        {onAdd && (
          <IconButton
            aria-label="Add Eth Asset"
            variant="link"
            icon={IconCirclePlus}
            onClick={onAdd}
          />
        )}
        {onRemove && (
          <RemoveAssetDialog assetSymbol={asset.symbol} onConfirm={onRemove}>
            <IconButton
              aria-label="Remove Eth Asset"
              variant="link"
              icon={IconSquareRoundedX}
            />
          </RemoveAssetDialog>
        )}
      </Flex>
    </CardList.Item>
  );
};

const styles = tv({
  slots: {
    assetWrapper: 'w-full',
    assetSymbol: 'text-heading',
    cardItem: 'gap-6 items-center fuel-[HStack]:justify-between',
    actionIcon: 'p-[2px] m-[2px] text-heading',
  },
});
