import React from 'react';
import TxsButton from '../TxsButton/TxsButton';

function TxsButtonContainer() {
  return (
    <div className="flex justify-end gap-4">
      <TxsButton buttonName={'Download Page Data'} />
      <TxsButton buttonName={'Export CSV'} />
    </div>
  );
}

export default TxsButtonContainer;
