import type React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ContractHeader } from '~/systems/Contract/components/ContractHeader';

const ContractLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <ContractHeader id={id || ''} />
      <Outlet />
    </>
  );
};

export default ContractLayout;
