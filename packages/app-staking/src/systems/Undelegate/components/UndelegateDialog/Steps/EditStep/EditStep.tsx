import type { BN } from 'fuels';
import { useTranslation } from 'react-i18next';
import { ButtonReview } from './ButtonReview';
import { Input } from './Input';

interface EditStepProps {
  isPaused: boolean;
  goToReview: () => void;
  handleChange: (amount: BN) => void;
  amount: BN;
  delegated: BN | null;
  error: string | null;
  submitData: {
    label: string;
    disabled: boolean;
  };
  isLoading: boolean;
  isGettingDetails: boolean;
  tokenRate: number;
}

export function EditStep({
  goToReview,
  isPaused,
  amount,
  delegated,
  error,
  handleChange,
  submitData,
  isGettingDetails,
  isLoading = false,
  tokenRate,
}: EditStepProps) {
  const { t } = useTranslation();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isPaused) return;
    e.preventDefault();
    goToReview();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 mt-8">
      <div className="flex flex-col gap-1">
        <span className="fuel-label">
          {t('staking.dialog.how_much_undelegate')}
        </span>
        <Input
          isPaused={isPaused}
          amount={amount}
          delegated={delegated}
          error={error}
          handleChange={handleChange}
          isLoading={isLoading}
          disabled={isLoading}
          tokenRate={tokenRate}
        />
      </div>
      <ButtonReview submitData={submitData} isLoading={isGettingDetails} />
    </form>
  );
}
