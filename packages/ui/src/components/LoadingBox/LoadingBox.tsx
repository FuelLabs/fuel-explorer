import { tv } from 'tailwind-variants';

import type { BoxProps } from '../Box';
import { Box } from '../Box';

type LoadingBoxProps = BoxProps;

export function LoadingBox({ className, ...props }: LoadingBoxProps) {
  return <Box {...props} className={loader({ className })} />;
}

const loader = tv({
  base: [
    'bg-gray-3 rounded',
    'isolate overflow-hidden shadow-xs shadow-black/5 before:border-t before:border-gray-5',
    'relative before:absolute before:inset-0 before:-translate-x-full',
    'before:animate-[shimmer_2s_infinite]',
    'before:block before:content-[""] before:w-full before:h-full',
    'before:bg-gradient-to-r',
    'before:from-transparent before:via-gray-4 before:to-transparent',
  ],
});
