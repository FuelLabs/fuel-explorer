import { IconEye, IconEyeOff, IconLock } from '@tabler/icons-react';
import { useState } from 'react';
import { createComponent } from '~/utils/component';

import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import type { InputFieldProps, InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

export type InputPasswordProps = InputProps & Omit<InputFieldProps, 'type'>;

export const InputPassword = createComponent<InputPasswordProps>({
  id: 'InputPassword',
  render: (_, { size, className, variant, color, ...props }) => {
    const [opened, setOpened] = useState(false);
    const type = opened ? 'text' : 'password';
    return (
      <Input size={size} className={className} variant={variant} color={color}>
        <Input.Slot>
          <Icon icon={IconLock} size={16} color="text-icon" />
        </Input.Slot>
        <Input.Field {...props} type={type} />
        <Input.Slot className="mr-1">
          <IconButton
            variant="link"
            color="gray"
            aria-label="Toggle passowrd"
            icon={opened ? IconEye : IconEyeOff}
            iconColor={opened ? 'text-brand' : 'text-icon'}
            iconSize={16}
            onClick={() => setOpened(!opened)}
          />
        </Input.Slot>
      </Input>
    );
  },
});
