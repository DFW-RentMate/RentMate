import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ListingWizard from './ListingWizard';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <ListingWizard />;
}
