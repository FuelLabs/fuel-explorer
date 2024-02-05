export const keyframes = {
  'accordion-down': {
    from: {
      height: '0px',
    },
    to: {
      height: 'var(--radix-accordion-content-height)',
    },
  },
  'accordion-up': {
    from: {
      height: 'var(--radix-accordion-content-height)',
    },
    to: {
      height: '0px',
    },
  },
  'spinner-spin': {
    '0%': {
      'stroke-dashoffset': 'calc(0.66 * var(--size))',
      transform: 'rotate(0deg)',
    },
    '50%': {
      'stroke-dashoffset': 'calc(3.14 * var(--size))',
      transform: 'rotate(720deg)',
    },
    '100%': {
      'stroke-dashoffset': 'calc(0.66 * var(--size))',
      transform: 'rotate(1080deg)',
    },
  },
  shimmer: {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
};

export const animation = {
  'accordion-open': 'accordion-down 0.2s ease-out',
  'accordion-closed': 'accordion-up 0.2s ease-in',
  'spinner-spinning': 'spinner-spin 2s linear infinite',
};
