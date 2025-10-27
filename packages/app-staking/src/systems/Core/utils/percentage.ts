export function formatPercentagePrecision(value: number) {
  if (Number.isNaN(value)) {
    return '0.00';
  }
  if (value < 0.01) {
    return value.toFixed(4);
  }
  return value.toFixed(2);
}

export function toPercentage(value: string | number = '0') {
  const percentage =
    typeof value === 'string' ? Number.parseFloat(value) * 100 : value * 100;
  if (Number.isNaN(percentage)) {
    return '0%';
  }
  return `${formatPercentagePrecision(percentage)}%`;
}
