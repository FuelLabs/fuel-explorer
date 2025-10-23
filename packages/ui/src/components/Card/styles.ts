import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'flex flex-col py-4 gap-4 bg-panel-solid overflow-clip',
    header: 'flex flex-col gap-1.5 px-4',
    title:
      'm-0 text-gray-11 leading-none tracking-tight flex items-center gap-2',
    description: 'm-0 text-sm text-secondary',
    body: 'px-4 text-base',
    footer: 'px-4 pt-0 self-end flex gap-2',
  },
});
