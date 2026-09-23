import type { Abi, AbiEvent, AbiParameter } from 'viem';

// viem doesn't expose an ethers-style parsedLog.signature string, so it's
// rebuilt from the matching ABI event's input types instead.
function parameterType(param: AbiParameter): string {
  if (param.type.startsWith('tuple') && 'components' in param) {
    const arraySuffix = param.type.slice('tuple'.length);
    const components = param.components as AbiParameter[];
    return `(${components.map(parameterType).join(',')})${arraySuffix}`;
  }
  return param.type;
}

export function eventSignature(abi: Abi, eventName: string): string {
  const event = abi.find(
    (item): item is AbiEvent =>
      item.type === 'event' && item.name === eventName,
  );
  if (!event) return `${eventName}()`;
  return `${eventName}(${event.inputs.map(parameterType).join(',')})`;
}
