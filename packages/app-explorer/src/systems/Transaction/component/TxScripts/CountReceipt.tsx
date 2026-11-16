import { Text } from '@fuels/ui';
import { IconArrowRight } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

export function CountReceipt({ num, op }: { num: number; op: string }) {
  const { t } = useTranslation();
  const length = new Intl.NumberFormat('en-IN', {
    minimumIntegerDigits: 2,
  }).format(num);
  return (
    <Text
      className="flex items-center gap-2 text-sm text-[var(--fuel-element-low-em)]"
      leftIcon={IconArrowRight}
      iconSize={14}
    >
      {length} {t(`tx.op.${op}`, { count: num })}
    </Text>
  );
}
