import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    receiptRow: 'peer relative',
  },
  variants: {
    indent: {
      true: {
        receiptRow: [
          'ml-5 before:absolute before:top-[-35px] before:left-[-20px]',
          'tablet:ml-10 tablet:before:left-[-40px]',
          'before:bottom-[20px] before:right-[100%]',
          'before:content-[""] before:block before:border-l before:border-b',
          'before:border-border before:border-dashed before:rounded-bl',
          '[&[data-opened=true]:before+&]:top-[-120px]',
        ],
      },
    },
  },
});
