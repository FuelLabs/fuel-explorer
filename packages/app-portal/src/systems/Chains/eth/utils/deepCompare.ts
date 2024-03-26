import { Fuel } from 'fuels';

export function deepCompare<T>(a: T, b: T) {
  if (typeof a === 'object') {
    return JSON.stringify(a, stringify) === JSON.stringify(b, stringify);
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
