import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { SafeListing } from '@/app/types';

export async function getFavoriteListings(): Promise<SafeListing[]> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) return [];

  const favorites = await prisma.favorites.findMany({
    where: { user_id: userId },
    include: {
      listings: { include: { listing_photos: true } },
    },
  });

  return favorites.map((f) => ({
    ...f.listings,
    rent_price: Number(f.listings.rent_price),
    deposit: f.listings.deposit ? Number(f.listings.deposit) : null,
    created_at: f.listings.created_at?.toISOString() ?? null,
    updated_at: f.listings.updated_at?.toISOString() ?? null,
    expires_at: f.listings.expires_at?.toISOString() ?? null,
    move_in_date: f.listings.move_in_date?.toISOString() ?? null,
  })) as SafeListing[];
}
