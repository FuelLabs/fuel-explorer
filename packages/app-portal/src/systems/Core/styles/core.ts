import { cssObj } from '@fuel-ui/css';

export const SCROLL_WIDTH = `14px`;

export const scrollableContent = cssObj({
  width: `calc(100vw - ${SCROLL_WIDTH})`,
  maxWidth: `calc(100vw - ${SCROLL_WIDTH})`,
  paddingLeft: SCROLL_WIDTH,
  boxSizing: 'border-box',
});

export const scrollable = (
  regularColor: string = '$gray8',
  hoverColor: string = '$gray10'
) =>
  cssObj({
    overflowY: 'overlay',
    scrollBehavior: 'smooth',

    '&::-webkit-scrollbar': {
      width: SCROLL_WIDTH,
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: regularColor,
      opacity: 0.5,
      border: '4px solid transparent',
      borderRadius: '12px',
      backgroundClip: 'content-box',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: hoverColor,
    },
  });

export const coreStyles = {
  scrollableContent,
  scrollable,
};
