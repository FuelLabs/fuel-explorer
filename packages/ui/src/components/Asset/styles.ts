import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    iconImage: [
      'data-[size="xs"]:w-[24px]',
      'data-[size="sm"]:w-[32px]',
      'data-[size="md"]:w-[36px]',
      'data-[size="lg"]:w-[44px]',
    ],
    iconWritten: [
      'rounded-full bg-gray-6 items-center justify-center text-heading',
      'data-[size="xs"]:w-[24px] data-[size="xs"]:h-[24px]',
      'data-[size="sm"]:w-[32px] data-[size="sm"]:h-[32px]',
      'data-[size="md"]:w-[36px] data-[size="md"]:h-[36px]',
      'data-[size="lg"]:w-[44px] data-[size="lg"]:h-[44px]',
    ],
    iconText: [
      'data-[size="xs"]:text-xs',
      'data-[size="sm"]:text-sm',
      'data-[size="md"]:text-md',
      'data-[size="lg"]:text-lg',
    ],
  },
});
