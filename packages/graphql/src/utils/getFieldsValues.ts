/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepIterateObject(
  obj: any,
  callback: (path: string, value: any) => void,
  parentKey = ''
) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const currentKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively call the function
      deepIterateObject(value, callback, currentKey);
    } else {
      // If the value is not an object, call the callback function with key-value pair
      callback(currentKey, value);
    }
  });
}

export function getFieldsValues<T = any>(
  obj: any,
  keys: Array<string>
): Array<T> {
  const values: Array<T> = [];

  deepIterateObject(obj, (path, value) => {
    const [key] = path.split('.').slice(-1);
    if (keys.includes(key)) {
      values.push(value);
    }
  });

  return values.filter((i) => !!i);
}

export function removeDuplicates(values: Array<string>): Array<string> {
  const _values = values.reduce(
    (vals: Record<string, boolean>, val: string) => {
      vals[val] = true;
      return vals;
    },
    {}
  );
  return Object.keys(_values);
}
