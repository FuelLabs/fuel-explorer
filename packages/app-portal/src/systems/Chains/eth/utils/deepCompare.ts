import { Fuel } from 'fuels';

export function deepCompare<T>(a: T, b: T) {
  if (typeof a === 'object') {
    try {
      return JSON.stringify(a, stringify) === JSON.stringify(b, stringify);
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (e) {
      // if it fails at least won't break, just continue the flow
      return false;
    }
  }

  return a === b;
}

function stringify<T>(_key: string, value: T) {
  if (value instanceof Fuel) {
    return value.currentConnector()?.name;
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  return value;
}
