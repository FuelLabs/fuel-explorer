import type { ButtonProps } from '@fuels/ui';
import { Button } from '@fuels/ui';
import { IconCopy } from '@tabler/icons-react';

type CopyButtonProps = ButtonProps & {
  value: string;
  text?: string;
};

const COPY_ICON_SIZES = {
  '1': 15,
  '2': 19,
  '3': 24,
  '4': 29,
};

const CopyButton = ({ value, text = 'Copy', ...props }: CopyButtonProps) => {
  const size = props.size || '1';
  const variant = props.variant || 'soft';

  return (
    <Button
      {...props}
      className="max-w-[100px]"
      variant={variant}
      size={size}
      color="gray"
      iconSize={COPY_ICON_SIZES[size as string]}
      rightIcon={IconCopy}
      iconColor="text-muted"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
      }}
    >
      {text}
    </Button>
  );
};

export default CopyButton;
