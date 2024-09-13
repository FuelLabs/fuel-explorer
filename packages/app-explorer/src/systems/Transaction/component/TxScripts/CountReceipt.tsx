import { Text } from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';

export function CountReceipt({ num, op }: { num: number; op: string }) {
  const length = new Intl.NumberFormat('en-IN', {
    minimumIntegerDigits: 2,
  }).format(num);
  const text = num > 1 ? `${op}s` : op;
  return (
    <Text
      className="flex items-center gap-2 text-sm text-muted"
      leftIcon={IconArrowRight}
      iconSize={14}
    >
      {length} {text}
    </Text>
  );
}
