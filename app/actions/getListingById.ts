import prisma from '@/lib/prisma';
import { SafeListing } from '../types';

export default async function getListingById(id: string) {
  const listing = await prisma.listings.findUnique({
    where: { id },
    include: { listing_photos: true },
  });

  if (!listing) return null;

  return {
    ...listing,
    rent_price: Number(listing.rent_price),
    deposit: listing.deposit ? Number(listing.deposit) : null,
    created_at: listing.created_at?.toISOString() ?? null,
    updated_at: listing.updated_at?.toISOString() ?? null,
    expires_at: listing.expires_at?.toISOString() ?? null,
    move_in_date: listing.move_in_date?.toISOString() ?? null,
  } as SafeListing;
}
