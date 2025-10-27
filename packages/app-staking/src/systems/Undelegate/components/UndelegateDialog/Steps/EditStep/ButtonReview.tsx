import { Button } from '@fuels/ui';

interface ButtonReviewProps {
  submitData: {
    label: string;
    disabled: boolean;
  };
  isLoading: boolean;
}

export function ButtonReview({ submitData, isLoading }: ButtonReviewProps) {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      disabled={submitData.disabled}
      size="3"
      className="text-[13px] w-full h-[44px] rounded-[10px]"
    >
      {submitData.label}
    </Button>
  );
}
