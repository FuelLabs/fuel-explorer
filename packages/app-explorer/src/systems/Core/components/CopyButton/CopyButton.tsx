import type { ButtonProps } from '@fuels/ui';
import { Button } from '@fuels/ui';
import { IconCopy } from '@tabler/icons-react';

type CopyButtonProps = ButtonProps & {
  value: string;
  text?: string;
};

const COPY_ICON_SIZES: Record<string, number> = {
  '1': 15,
  '2': 19,
  '3': 24,
  '4': 29,
};

const CopyButton = ({
  value,
  text = 'Copy',
  size = '1',
  variant = 'soft',
  ...props
}: CopyButtonProps) => {
  const iconSize = COPY_ICON_SIZES[size];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      {...props}
      className="max-w-[100px]"
      variant={variant}
      size={size}
      color="gray"
      rightIcon={IconCopy}
      iconSize={iconSize}
      iconColor="text-muted"
      onClick={handleCopy}
    >
      {text}
    </Button>
  );
};

export default CopyButton;