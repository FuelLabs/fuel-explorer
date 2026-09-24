import type { ButtonProps } from '@fuels/ui';
import { Button, useCopied } from '@fuels/ui';
import { IconCheck, IconCopy } from '@fuels/ui';

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

const CopyButton = ({ value, text = 'Copy', ...props }: CopyButtonProps) => {
  const size = props.size || '1';
  const variant = props.variant || 'soft';
  const { copied, markCopied } = useCopied();

  return (
    <Button
      {...props}
      className="max-w-[100px]"
      variant={variant}
      size={size}
      color="gray"
      iconSize={COPY_ICON_SIZES[size as string]}
      rightIcon={copied ? IconCheck : IconCopy}
      iconColor="text-muted"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        markCopied();
      }}
    >
      {text}
    </Button>
  );
};

export default CopyButton;
