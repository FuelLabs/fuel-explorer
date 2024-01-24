import type { AbstractAddress, BN, Message, Provider } from 'fuels';
import { setTimeout } from 'timers/promises';

export async function waitForMessage(
  provider: Provider,
  recipient: AbstractAddress,
  nonce: BN,
  timeout: number
): Promise<Message> {
  const startTime = new Date().getTime();

  while (new Date().getTime() - startTime < timeout) {
    const messages = await provider.getMessages(recipient, {
      first: 1000,
    });

    const message = messages.find((message) => {
      return message.nonce.toString() === nonce.toHex(32).toString();
    });

    if (message) {
      return message;
    }

    await setTimeout(1000);
  }

  throw new Error('Timeout waiting for message');
}
