import { TextArea as RadixTextArea } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type TextAreaProps = PropsOf<typeof RadixTextArea>;

export const TextArea = createComponent<TextAreaProps, typeof RadixTextArea>({
  id: 'TextArea',
  baseElement: RadixTextArea,
});
