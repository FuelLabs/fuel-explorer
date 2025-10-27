import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import type { Address } from 'viem';
import { Services, store } from '~portal/store';
import {
  getAssetEthCurrentChain,
  getAssetFuelCurrentChain,
} from '~portal/systems/Assets/utils';
import { isFuelChain } from '~portal/systems/Chains';
import type { BridgeMachineState } from '../machines';
import { bnToBigInt } from '../utils/bnToBigInt';
import { isAmountGreaterThan } from '../utils/isAmountGreaterThan';
import { useBridgeSolidityContracts } from './useBridgeSolidityContracts';
import { useWithdrawLimit } from './useWithdrawLimit';

const bridgeSelectors = {
  fromNetwork: (state: BridgeMachineState) => state.context?.fromNetwork,
  withdraw: (state: BridgeMachineState) => {
    if (state.context.assetAmount) {
      return bnToBigInt(state.context.assetAmount);
    }

    return null;
  },
  asset: (state: BridgeMachineState) => state.context?.asset,
};

export const WITHDRAW_WARNING_PERCENTAGE = 60; // % threshold to display this warning

export enum WithdrawWarning {
  None = 'NONE',
  Limit = 'LIMIT',
  Threshold = 'THRESHOLD',
}

export const useWithdrawWarning = () => {
  const fromNetwork = store.useSelector(
    Services.bridge,
    bridgeSelectors.fromNetwork,
  );

  const isWithdraw = isFuelChain(fromNetwork);

  const withdraw = store.useSelector(Services.bridge, bridgeSelectors.withdraw);
  const asset = store.useSelector(Services.bridge, bridgeSelectors.asset);

  const [debouncedWithdraw, setDebouncedWithdraw] = useState<bigint | null>(
    withdraw,
  );

  const ethAsset = useMemo(
    () => (asset ? getAssetEthCurrentChain(asset) : undefined),
    [asset],
  );
  const fuelAsset = useMemo(
    () => (asset ? getAssetFuelCurrentChain(asset) : undefined),
    [asset],
  );

  const { bridgeSolidityContracts } = useBridgeSolidityContracts({
    query: { enabled: isWithdraw },
  });

  const contract = useMemo<Address | undefined>(() => {
    if (!bridgeSolidityContracts || !isWithdraw) {
      return undefined;
    }

    // FuelERC20GatewayV4 if it's an ERC20 asset
    if (ethAsset?.address) {
      return bridgeSolidityContracts.FuelERC20GatewayV4;
    }

    // FuelMessagePortal if it's ETH
    return bridgeSolidityContracts.FuelMessagePortal;
  }, [isWithdraw, ethAsset, bridgeSolidityContracts]);

  const { data: limit } = useWithdrawLimit(
    contract,
    ethAsset?.address as Address | undefined,
  );

  const isExceeded = useMemo<WithdrawWarning>(() => {
    if (!limit || !debouncedWithdraw || !fuelAsset || !ethAsset) {
      return WithdrawWarning.None;
    }

    const isExceededLimit = isAmountGreaterThan(
      { amount: debouncedWithdraw, decimals: fuelAsset.decimals },
      { amount: limit, decimals: ethAsset.decimals },
    );
    if (isExceededLimit) {
      return WithdrawWarning.Limit;
    }

    // Calculate the "available" limit based on the threshold percentage
    const target = (limit * BigInt(WITHDRAW_WARNING_PERCENTAGE)) / 100n;
    const isExceededThreshold = isAmountGreaterThan(
      { amount: debouncedWithdraw, decimals: fuelAsset.decimals },
      { amount: target, decimals: ethAsset.decimals },
    );
    return isExceededThreshold
      ? WithdrawWarning.Threshold
      : WithdrawWarning.None;
  }, [limit, debouncedWithdraw, fuelAsset, ethAsset]);

  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedWithdraw(value);
    }, 400);

    handler(withdraw);

    return () => {
      handler.cancel();
    };
  }, [withdraw]);

  return { isExceeded };
};
