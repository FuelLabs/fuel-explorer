import type { HexAddress } from 'app-commons';
import { type AssetEth, type BN, bn } from 'fuels';
import { useMemo } from 'react';
import { useBridgeSolidityContracts } from '~portal/systems/Bridge/hooks/useBridgeSolidityContracts';
import { useTokenAllowance } from '~portal/systems/Core/hooks/useTokenAllowance';

export function useBridgeAllowance({
  ethAsset,
  ethAddress,
  isDeposit,
  assetAmount,
}: {
  ethAsset?: AssetEth;
  ethAddress: HexAddress;
  isDeposit: boolean;
  assetAmount: BN | undefined;
}) {
  const ethAssetAddress = ethAsset?.address as HexAddress;
  const decimals = ethAsset?.decimals;

  const {
    bridgeSolidityContracts,
    isLoading: isLoadingBridgeSolidityContracts,
  } = useBridgeSolidityContracts({
    query: {
      enabled: !!ethAssetAddress && !!ethAddress && !!isDeposit,
    },
  });
  const { data: _tokensAllowance, isLoading: isLoadingAllowance } =
    useTokenAllowance(
      ethAssetAddress,
      bridgeSolidityContracts?.FuelERC20GatewayV4,
      ethAddress,
      {
        enabled:
          !!isDeposit &&
          !!bridgeSolidityContracts?.FuelERC20GatewayV4 &&
          !!ethAssetAddress &&
          !!ethAddress,
        // Add shorter refetch interval for allowance to catch updates quickly
        refetchInterval: 2000,
      },
    );
  const tokensAllowance = useMemo(
    () => bn(((_tokensAllowance as bigint) || 0n).toString()),
    [_tokensAllowance],
  );
  const loading = isLoadingAllowance || isLoadingBridgeSolidityContracts;
  const invalidAmount = assetAmount == null || assetAmount.eq(0);
  const isInvalid =
    !!isDeposit &&
    !!ethAssetAddress &&
    (invalidAmount ||
      decimals == null ||
      _tokensAllowance == null ||
      !bridgeSolidityContracts?.FuelERC20GatewayV4);
  const requiresAllowance =
    isDeposit &&
    !isInvalid &&
    _tokensAllowance != null &&
    assetAmount != null &&
    tokensAllowance.lt(assetAmount);

  return {
    isInvalidAllowance: isInvalid,
    requiresAllowance,
    isLoadingAllowance: loading,
    tokensAllowance,
  };
}
