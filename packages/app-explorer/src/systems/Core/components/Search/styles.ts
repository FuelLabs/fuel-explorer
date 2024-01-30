import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    dropdownItem: 'hover:bg-border focus:bg-border',
    inputWrapper:
      '[&_.rt-TextFieldChrome]:[&[data-opened=true]]:rounded-b-none',
    searchSize: 'w-full tablet:w-[400px]',
    dropdownContent:
      'mt-[-4px] rounded-t-none shadow-none border border-t-0 border-border',
  },
});
