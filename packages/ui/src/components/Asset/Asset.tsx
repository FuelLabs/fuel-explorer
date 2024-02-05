import { bn } from "@fuel-ts/math";
import type { BNInput } from "@fuel-ts/math";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import type { ReactNode } from "react";

import { useStrictedChildren } from "../../hooks/useStrictedChildren";
import { createComponent, withNamespace } from "../../utils/component";
import { cx } from "../../utils/css";
import type { PropsOf } from "../../utils/types";
import { Badge } from "../Badge/Badge";
import { Box, HStack } from "../Box";
import type { HStackProps } from "../Box";
import type { TextProps } from "../Text/Text";
import { Text } from "../Text/Text";

import { AssetProvider, useAssetContext } from "./useAssetContext";

export type AssetIconSize = "xs" | "sm" | "md" | "lg";

export type AssetObj = {
  name: string;
  symbol: string;
  imageUrl?: string;
};

export type AssetProps = HStackProps & {
  asset: AssetObj;
  amount?: BNInput;
  units?: number;
  precision?: number;
  iconSize?: AssetIconSize | number;
  negative?: boolean;
  hideIcon?: boolean;
};

export type AssetIconProps = Omit<
  Omit<PropsOf<"img">, "width" | "height" | "color"> & { icon?: ReactNode },
  "children"
>;

export type AssetNameProps = Omit<PropsOf<"span">, "children">;
export type AssetSymbolProps = PropsOf<"span">;
export type AssetAmountProps = Omit<
  TextProps,
  "leftIcon" | "rightIcon" | "iconColor"
>;

const CHILD_ITEMS = [
  "AssetIcon",
  "AssetSymbol",
  "AssetName",
  "AssetAmount",
  "HStack",
  "VStack",
];

export const AssetRoot = createComponent<AssetProps, "div">({
  id: "AssetRoot",
  render: (
    _,
    {
      asset,
      amount,
      units,
      precision,
      iconSize,
      negative,
      hideIcon,
      children,
      gap = "4",
      ...props
    },
  ) => {
    {
      const newChildren = useStrictedChildren("Asset", CHILD_ITEMS, children);
      const amountStr = bn(amount).format({ units, precision });
      const isNegative = negative || bn(amount).lt(0);
      return (
        <AssetProvider
          value={{
            iconSize,
            asset,
            units,
            precision,
            hideIcon,
            amount,
            amountStr,
            isNegative,
          }}
        >
          <HStack {...props} align="center" gap={gap}>
            {newChildren}
          </HStack>
        </AssetProvider>
      );
    }
  },
});

const SIZES_MAP = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
};

export const AssetIcon = createComponent<AssetIconProps, "img">({
  id: "AssetIcon",
  render: (_, { icon, ...props }) => {
    const { asset, iconSize = "md" } = useAssetContext();
    const size = typeof iconSize === "string" ? SIZES_MAP[iconSize] : iconSize;

    if (icon) {
      return (
        <Box asChild aria-label={`${asset.name} icon`} role="img" {...props}>
          <span>{icon}</span>
        </Box>
      );
    }

    if (!asset.imageUrl) {
      return (
        <Badge
          aria-label={`${asset.name} initials`}
          color="gray"
          radius="full"
          role="img"
          size="2"
          variant="solid"
          {...props}
          className={cx(props.className, "h-8 w-8 px-2")}
        >
          {asset.symbol.slice(0, 2).toUpperCase()}
        </Badge>
      );
    }

    return (
      <img
        {...props}
        alt={`${asset.name} logo`}
        src={asset.imageUrl}
        height={size}
        width={size}
      />
    );
  },
});

export const AssetSymbol = createComponent<AssetSymbolProps, "span">({
  id: "AssetSymbol",
  render: (_, props) => {
    const assetProps = useAssetContext();
    return <span {...props}>{assetProps.asset.symbol}</span>;
  },
});

export const AssetName = createComponent<AssetNameProps, "span">({
  id: "AssetName",
  render: (_, props) => {
    const assetProps = useAssetContext();
    return <span {...props}>{assetProps.asset.name}</span>;
  },
});

export const AssetAmount = createComponent<AssetAmountProps, "span">({
  id: "AssetAmount",
  render: (_, props) => {
    const { hideIcon, amountStr, isNegative } = useAssetContext();
    return (
      <Text
        {...props}
        iconColor={isNegative ? "text-red-8" : "text-brand"}
        {...(!hideIcon && {
          leftIcon: isNegative ? IconArrowDown : IconArrowUp,
        })}
      >
        {amountStr}
      </Text>
    );
  },
});

export const Asset = withNamespace(AssetRoot, {
  Amount: AssetAmount,
  Icon: AssetIcon,
  Name: AssetName,
  Symbol: AssetSymbol,
});
