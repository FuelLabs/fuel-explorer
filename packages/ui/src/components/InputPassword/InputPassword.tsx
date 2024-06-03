import { IconEye, IconEyeOff, IconLock } from '@tabler/icons-react';
import { useState } from 'react';

import { createComponent } from '../../utils/component';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

export type InputPasswordProps = Omit<InputProps, 'type'>;

export const InputPassword = createComponent<InputPasswordProps, typeof Input>({
  id: 'InputPassword',
  render: (_, { size, className, variant, color, ...props }) => {
    const [opened, setOpened] = useState(false);
    const type = opened ? 'text' : 'password';
    return (
      <Input
        className={className}
        color={color}
        size={size}
        variant={variant}
        {...props}
        type={type}
      >
        <Input.Slot side="left">
          <Icon color="text-icon" icon={IconLock} size={16} />
        </Input.Slot>
        <Input.Slot className="mr-1" side="right">
          <IconButton
            aria-label="Toggle passowrd"
            color="gray"
            icon={opened ? IconEye : IconEyeOff}
            iconColor={opened ? 'text-brand' : 'text-icon'}
            iconSize={16}
            variant="link"
            onClick={() => setOpened(!opened)}
          />
        </Input.Slot>
      </Input>
    );
  },
});
