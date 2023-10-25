import type { ButtonProps } from '@fuels/ui';
import { Button, Copyable } from '@fuels/ui';

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

  return (
    <Button variant="soft" size={size} color="gray">
      <Copyable
        value={value}
        iconSize={COPY_ICON_SIZES[size as string]}
        className="text-inherit"
      >
        {text}
      </Copyable>
    </Button>
  );
};

export default CopyButton;
