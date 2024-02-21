import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: [
      'flex flex-col py-4 gap-4 rounded-md bg-panel-solid text-color overflow-clip',
      'border border-solid border-card-border',
    ],
    header: 'flex flex-col gap-1.5 px-4 text-heading',
    title:
      'm-0 font-semibold leading-none tracking-tight text-xl flex items-center gap-2',
    description: 'm-0 text-sm text-secondary',
    body: 'px-4 text-base',
    footer: 'px-4 pt-0 self-end flex gap-2',
  },
});
