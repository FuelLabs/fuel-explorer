import { TablerIconsProps } from '@tabler/icons-react';

export const IconBrandWarpCastFilled = ({
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
        d="M4.742 2h14.064v20h-2.064v-9.161h-.02a4.968 4.968 0 0 0-9.895 0h-.02V22H4.741V2Z"
      />
      <path
        fill={fill}
        d="m1 4.839.839 2.838h.71v11.484a.647.647 0 0 0-.646.645v.775h-.129a.645.645 0 0 0-.645.645V22h7.226v-.774a.645.645 0 0 0-.645-.645h-.13v-.774a.647.647 0 0 0-.645-.646h-.774V4.84H1Zm15.871 14.322a.645.645 0 0 0-.645.645v.775h-.13a.645.645 0 0 0-.644.645V22h7.225v-.774a.645.645 0 0 0-.645-.645h-.129v-.774a.647.647 0 0 0-.645-.646V7.677h.71l.838-2.838h-5.16V19.16h-.775Z"
      />
    </svg>
  );
};
