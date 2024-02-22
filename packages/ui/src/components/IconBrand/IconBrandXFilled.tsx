import { TablerIconsProps } from '@tabler/icons-react';

export const IconBrandXFilled = ({
  fill = 'currentColor',
  size,
}: TablerIconsProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <path
        fill={fill}
        d="M13.895 10.47 21.335 2h-1.762l-6.464 7.353L7.951 2H2l7.802 11.12L2 22h1.763l6.82-7.766L16.034 22h5.95"
      />
    </svg>
  );
};
