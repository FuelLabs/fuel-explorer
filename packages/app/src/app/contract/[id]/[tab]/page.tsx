import { ContractScreen } from '~/systems/Contract/screens/Contract';

type ContractProps = {
  params: {
    id: string;
    tab: string;
  };
};

export default async function ContractPage({
  params: { id, tab },
}: ContractProps) {
  return <ContractScreen id={id} tab={tab} />;
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
