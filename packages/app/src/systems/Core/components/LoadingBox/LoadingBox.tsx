import type { BoxProps } from '@fuels/ui';
import { Box } from '@fuels/ui';
import { tv } from 'tailwind-variants';

type LoadingBoxProps = BoxProps;

export function LoadingBox({ className, ...props }: LoadingBoxProps) {
  return <Box {...props} className={loader({ className })} />;
}

const loader = tv({
  base: [
    'bg-gray-3 rounded',
    'isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-gray-5',
    'relative before:absolute before:inset-0 before:-translate-x-full',
    'before:animate-[shimmer_2s_infinite]',
    'before:block before:content-[""] before:w-full before:h-full',
    'before:bg-gradient-to-r',
    'before:from-transparent before:via-gray-4 before:to-transparent',
  ],
});
