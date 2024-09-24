import { HStack } from '@fuels/ui';
import React from 'react';

export interface DAppTileProps {
  name: string;
  image: string;
}
const DAppTile = (props: DAppTileProps) => {
  return (
    <HStack>
      <img
        src={props.image}
        // {relativeUrl(`/ecosystem/images/${image}.jpeg`)}
        alt={props.name}
        width={'20px'}
        height={'20px'}
      />
      <p>{props.name}</p>
    </HStack>
  );
};

export default DAppTile;
