import { TablerIconsProps } from '@tabler/icons-react';

export const IconBrandYoutubeFilled = ({
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
        d="M19.015 3.508H4.986A4.982 4.982 0 0 0 0 8.493v7.014a4.983 4.983 0 0 0 4.984 4.984h14.031A4.985 4.985 0 0 0 24 15.507V8.493a4.985 4.985 0 0 0-4.985-4.985Zm-3.37 8.833-6.563 3.13a.261.261 0 0 1-.254-.015.262.262 0 0 1-.123-.223V8.778c0-.197.207-.324.382-.235l6.563 3.325a.265.265 0 0 1-.005.473Z"
      />
    </svg>
  );
};
