import prisma from '@/lib/prisma';

export default async function getListingById(id: string) {
  return await prisma?.listings.findUnique({
    where: { id },
    include: { listing_photos: true },
  });
}
