import React from 'react';

interface TxsButtonProps {
  buttonName: string;
}

function TxsButton({ buttonName }: TxsButtonProps) {
  return (
    <button
      type="button"
      className="bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-sm text-sm mb-3 text-white"
    >
      {buttonName}
    </button>
  );
}

export default TxsButton;
