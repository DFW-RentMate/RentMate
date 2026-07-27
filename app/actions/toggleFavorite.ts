'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function toggleFavorite(listingId: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) throw new Error('로그인이 필요합니다');

  const existing = await prisma.favorites.findUnique({
    where: {
      user_id_listing_id: { user_id: userId, listing_id: listingId },
    },
  });

  if (existing) {
    await prisma.favorites.delete({ where: { id: existing.id } });
    return false;
  } else {
    await prisma.favorites.create({
      data: { user_id: userId, listing_id: listingId },
    });
    return true;
  }
}
