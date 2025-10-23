import type { UnknownProps } from './types';

export function omit<T extends UnknownProps>(list: string[], props: T) {
  return Object.entries(props).reduce(
    (obj, [key, value]) => {
      if (list.some((k) => k === key)) return obj;
      return { ...obj, [key]: value };
    },
    {} as unknown as T,
  );
}

export function pick<T extends Record<any, any>>(list: string[], props: T) {
  return Object.entries(props).reduce(
    (obj, [key, value]) => {
      if (list.some((k) => k === key)) return { ...obj, [key]: value };
      return obj;
    },
    {} as unknown as T,
  );
}

type MapFunction<T> = (
  value: T,
  key: string,
  obj: Record<string, T>,
) => [string, any];

export function mapObjIndexed<T>(
  fn: MapFunction<T>,
  obj: Record<string, T>,
): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
    const value = obj[key];
    const [newKey, newValue] = fn(value as T, key, obj);

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      acc[newKey] = mapObjIndexed(fn, value as any); // Recursive call for nested objects
    } else {
      acc[newKey] = newValue;
    }
    return acc;
  }, {});
}

export function toCamelCase(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|-|\b\w|\s+)/g, (match, index) => {
    if (+match === 0 || match === '-') return ''; // remove spaces and hyphens
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function shortAddress(address = '', trimLeft = 6, trimRight = 4) {
  return address.length > 10
    ? `${address.slice(0, trimLeft)}...${address.slice(-trimRight)}`
    : address;
}
