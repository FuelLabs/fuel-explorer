'use client';
import React from 'react';

interface TxsTabProps {
  tabTitle: string;
  isActive: boolean;
  onClick: () => void; // onClick prop
}

export function TxsTab({ tabTitle, isActive, onClick }: TxsTabProps) {
  // Handle key events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Allow activation with Enter or Space
      onClick();
    }
  };

  return (
    <p
      className={`text-sm cursor-pointer ${
        isActive ? 'text-brand border-b-2 border-brand pb-2' : 'text-[#9f9f9f]'
      }`}
      onClick={onClick}
      onKeyDown={handleKeyDown} // Add key down event handler
    >
      {tabTitle}
    </p>
  );
}
