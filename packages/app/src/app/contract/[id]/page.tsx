import { redirect } from 'next/navigation';

type ContractProps = {
  params: {
    id: string;
  };
};

export default function Contract({ params: { id } }: ContractProps) {
  redirect(`/contract/${id}/assets`);
}
