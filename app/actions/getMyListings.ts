import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { SafeListing } from '../types';

export async function getMyListings() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return [];

  const listings = await prisma?.listings.findMany({
    where: { owner_id: userId },
    include: { listing_photos: true },
    orderBy: { created_at: 'desc' },
  });

  return listings?.map((listing) => ({
    ...listing,
    rent_price: Number(listing.rent_price),
    deposit: listing.deposit ? Number(listing.deposit) : null,
    created_at: listing.created_at?.toISOString() ?? null,
    updated_at: listing.updated_at?.toISOString() ?? null,
    expires_at: listing.expires_at?.toISOString() ?? null,
    move_in_date: listing.move_in_date?.toISOString() ?? null,
  })) as SafeListing[];
}
