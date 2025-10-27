import { AnimatedDialog, Button } from '@fuels/ui';

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
  return (
    <AnimatedDialog.Content
      open={open}
      aria-describedby={`The ${name} module is currently being updated.`}
      color="orange"
      style={{
        position: 'relative',
      }}
    >
      <div className="absolute top-0 left-0 right-0 hidden dark:flex justify-center">
        <img
          src="/paused-contract.svg"
          width={226}
          height={201}
          alt="Paused Contract"
        />
      </div>

      <AnimatedDialog.Title className="text-center font-bold pt-10 dark:pt-[160px]">
        Operations are temporarily paused
      </AnimatedDialog.Title>

      <AnimatedDialog.Description className="text-center mt-4">
        The {name} module is currently being updated.
      </AnimatedDialog.Description>

      <Button
        variant="solid"
        color="gray"
        size="3"
        className="w-full mt-[50px] hidden dark:block"
        onClick={onClose}
      >
        Close
      </Button>

      <Button
        variant="solid"
        color="green"
        size="3"
        className="w-full mt-[50px] block dark:hidden"
        onClick={onClose}
      >
        Close
      </Button>
    </AnimatedDialog.Content>
  );
};
