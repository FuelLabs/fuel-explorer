import { TablerIconsProps } from '@tabler/icons-react';

export const IconBrandTelegramFilled = ({
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
        d="M18.384 22.779a1.19 1.19 0 0 0 1.107.145 1.16 1.16 0 0 0 .724-.84C21.084 18 23.192 7.663 23.983 3.948a.779.779 0 0 0-.26-.758.802.802 0 0 0-.797-.14C18.733 4.602 5.82 9.447.542 11.4a.826.826 0 0 0-.542.799c.012.354.25.661.593.764 2.367.708 5.474 1.693 5.474 1.693s1.452 4.385 2.209 6.615c.095.28.314.5.603.576a.865.865 0 0 0 .811-.207l3.096-2.923s3.572 2.619 5.598 4.062Z"
      />
      <path
        fill="rgb(0, 0, 0)"
        d="m7.374 14.102 1.679 5.538.373-3.507 10.185-9.186a.276.276 0 0 0 .033-.377.283.283 0 0 0-.376-.064Z"
      />
    </svg>
  );
};
