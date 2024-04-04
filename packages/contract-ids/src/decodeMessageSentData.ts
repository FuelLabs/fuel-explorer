export const decodeMessageSentData = {
  erc20Deposit: (data?: `0x${string}`) => {
    if (!data) return null;

    const pattern =
      /^0x([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})$/;
    const match = data.match(pattern);
    if (!match) {
      return null;
    }

    const [, fuelTokenId, tokenAddress, , sender, to, amount] = match;

    const parsed = {
      fuelTokenId: `0x${fuelTokenId}`,
      tokenAddress: `0x${tokenAddress}`,
      sender: `0x${sender}`,
      to: `0x${to}`,
      amount,
    };

    return parsed;
  },
};
