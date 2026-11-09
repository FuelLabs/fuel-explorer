import { AnimatedDialog, Button } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

interface PausedContractDialogContentProps {
  name: string;
  open: boolean;
  onClose: () => void;
}

export const PausedContractDialogContent = ({
  name,
  open,
  onClose,
}: PausedContractDialogContentProps) => {
  const { t } = useTranslation();

  return (
    <AnimatedDialog.Content open={open}>
      <AnimatedDialog.Title className="pr-8">
        {t('portal.paused.dialog_title')}
      </AnimatedDialog.Title>

      <AnimatedDialog.Description className="mt-4">
        {t('portal.paused.module_updating', { name })}
      </AnimatedDialog.Description>

      <Button size="3" className="mt-8 w-full" onClick={onClose}>
        {t('portal.paused.close')}
      </Button>
    </AnimatedDialog.Content>
  );
};
