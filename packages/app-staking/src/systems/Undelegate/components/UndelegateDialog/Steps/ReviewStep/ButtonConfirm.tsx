import { Button } from '@fuels/ui';

interface Props {
  onClick: () => void;
  submitData: {
    label: string;
    disabled: boolean;
  };
  disabled?: boolean;
}
export function ButtonConfirm({
  onClick,
  submitData,
  disabled = false,
}: Props) {
  return (
    <Button
      disabled={submitData.disabled || disabled}
      onClick={onClick}
      className="text-[13px] w-full h-[44px] rounded-[10px]"
    >
      {submitData.label}
    </Button>
  );
}
