import type React from 'react';
import { Outlet } from 'react-router-dom';

// Breaks out of the Layout column so the bridge grid can span the page.
const BridgeLayout: React.FC = () => {
  return (
    <div className="relative -mt-8 pt-8 left-1/2 w-screen -translate-x-1/2 min-h-[calc(100dvh-70px)]">
      <Outlet />
    </div>
  );
};

export default BridgeLayout;
