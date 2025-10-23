import { bech32 } from 'bech32';
import { arrayify, hexlify } from 'fuels';

export function decodeMessage(messageData: string) {
  if (!messageData) return {};
  if (messageData === '0x') return {};
  const DEPOSIT_WITH_DATA =
    '0x0000000000000000000000000000000000000000000000000000000000000002';
  const data = Array.from(arrayify(messageData));
  const contractId = hexlify(Uint8Array.from(data.splice(0, 32)));
  const messageType = hexlify(Uint8Array.from(data.splice(0, 32)));
  if (messageType === DEPOSIT_WITH_DATA) {
    const tokenAddress = hexlify(Uint8Array.from(data.splice(0, 32)));
    const tokenId = hexlify(Uint8Array.from(data.splice(0, 32)));
    const msgSender = hexlify(Uint8Array.from(data.splice(0, 32)));
    const toContract = hexlify(Uint8Array.from(data.splice(0, 32)));
    return {
      contractId,
      messageType,
      tokenAddress,
      tokenId,
      msgSender,
      toContract,
    };
  }
  return {
    contractId,
    messageType,
  };
}

const hrp = 'fuelsequencer';

export function convertEthAddressToSequencerUserAddress(
  ethAddress: string,
): `fuelsequencer${string}` | undefined {
  if (!ethAddress) {
    return undefined;
  }

  // Remove the '0x' prefix and convert the address to a Buffer
  const addressBuffer = Buffer.from(ethAddress.slice(2), 'hex');

  // Convert the address Buffer to a Bech32 encoded address
  const bech32Address = bech32.encode(hrp, bech32.toWords(addressBuffer));

  return bech32Address as `fuelsequencer${string}`;
}
