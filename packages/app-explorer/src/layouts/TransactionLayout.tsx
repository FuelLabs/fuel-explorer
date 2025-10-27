import type React from 'react';
import { Outlet } from 'react-router-dom';

const TransactionLayout: React.FC = () => {
  return (
    <div className="transaction-layout">
      <Outlet />
    </div>
  );
};

export default TransactionLayout;
