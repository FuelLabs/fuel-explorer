import {
  useFuelAccountConnection,
  useTxsEthToFuel,
  useTxsFuelToEth,
} from '~/systems/Chains';

export const useBridgeTxs = () => {
  const { isConnected } = useFuelAccountConnection();
  const { txs: ethToFuelTxs, isLoading: isEthToFuelLoading } =
    useTxsEthToFuel();
  const { txs: fuelToEthTxs, isLoading: isFuelToEthLoading } =
    useTxsFuelToEth();
  const allTxs = [...(ethToFuelTxs || []), ...(fuelToEthTxs || [])];
  const txs = allTxs.sort((a, b) => {
    if (a.date === undefined) {
      return 1;
    }
    if (b.date === undefined) {
      return -1;
    }
    return b.date.getTime() - a.date.getTime();
  });

  const isLoading = isEthToFuelLoading || isFuelToEthLoading;

  return {
    txs,
    isLoading,
    shouldShowNotConnected: !isConnected && !isLoading,
    shouldShowEmpty: isConnected && !isLoading && txs.length === 0,
    shouldShowList: !isLoading && isConnected && txs.length > 0,
  };
};
