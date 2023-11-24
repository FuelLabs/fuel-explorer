import { redirect } from 'next/navigation';

type AccountProps = {
  params: {
    id: string;
  };
};

export default function Account({ params: { id } }: AccountProps) {
  redirect(`/account2/${id}/assets`);
}
