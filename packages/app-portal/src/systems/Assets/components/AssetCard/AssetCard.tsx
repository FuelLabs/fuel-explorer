import {
  Asset,
  CardList,
  Flex,
  IconButton,
  Text,
  useBreakpoints,
} from '@fuels/ui';
import { IconCoin } from '@tabler/icons-react';
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
}: AssetCardProps) => {
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
      className={classes.cardItem({ disabled: !hasBalance })}
    >
      <Flex justify="between" flexGrow="1" align="center">
        <Flex gap="3" align="center">
          <Asset asset={asset} iconSize={isMobile ? 30 : 38}>
            <Asset.Icon />
          </Asset>
          <Flex direction="column" gap="0">
            <Text
              className={classes.assetName()}
              aria-label={`${asset.symbol} name`}
              size={{
                initial: '2',
                lg: '3',
              }}
            >
              {asset.name || 'Unnamed'}
            </Text>
            <Text
              className={classes.assetSymbol()}
              aria-label={`${asset.symbol} symbol`}
              size={{
                initial: '2',
                lg: '3',
              }}
            >
              {asset.symbol}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="3" align="center">
          {hasBalance && (
            <Text
              data-showing-faucet={shouldShowFaucet}
              data-showing-add-to-wallet={showAddToWallet}
              className="font-mono"
              weight="medium"
              size={{
                initial: '3',
                lg: '4',
              }}
              color="gray"
              aria-label={`${asset.symbol} balance`}
            >
              {asset.balance !== '0.000' ? asset.balance : '-'}
            </Text>
          )}
          {shouldShowFaucet && (
            <IconButton
              aria-label={`Faucet ${asset.symbol}`}
              variant="link"
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
    assetWrapper: 'w-full',
    assetName: 'text-heading',
    assetSymbol: 'text-secondary',
    cardItem: 'p-3 gap-6 items-center fuel-[HStack]:justify-between flex-1',
    actionIcon: 'p-[2px] m-[2px] text-heading',
  },
  variants: {
    disabled: {
      true: {
        cardItem: 'bg-gray-1',
      },
    },
  },
});
