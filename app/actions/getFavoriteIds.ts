import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function getFavoriteIds(): Promise<string[]> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) return [];

  const favorites = await prisma.favorites.findMany({
    where: { user_id: userId },
    select: { listing_id: true },
  });

  return favorites.map((f) => f.listing_id);
}
