import prisma from '@/lib/prisma';
import { listing_photos, listings } from '../generated/prisma/client';
import {
  room_type_enum,
  preference_gender_enum,
} from '../generated/prisma/client';
import { SafeListing } from '../types';

export type ListingWithPhotos = listings & { listing_photos: listing_photos[] };

export interface IListingsParams {
  city?: string;
  min?: string;
  max?: string;
  roomType?: string;
  gender?: string;
  parking?: string;
  furnished?: string;
  date?: string;
}

const ROOM_TYPE_MAP: Record<string, room_type_enum> = {
  Private: room_type_enum.Private,
  Shared: room_type_enum.Shared,
  Studio: room_type_enum.Studio,
  Master_Bedroom: room_type_enum.Master_Bedroom,
};

export async function getListings(
  params: IListingsParams = {},
): Promise<SafeListing[]> {
  const { city, min, max, roomType, gender, parking, furnished, date } = params;

  try {
    const listings = await prisma.listings.findMany({
      where: {
        city: city || undefined,
        room_type: roomType ? ROOM_TYPE_MAP[roomType] : undefined,
        rent_price: {
          gte: min ? Number(min) : undefined,
          lte: max ? Number(max) : undefined,
        },
        gender_preference: (gender as preference_gender_enum) || undefined,
        parking_available: parking === 'true' ? true : undefined,
        furnished: furnished === 'true' ? true : undefined,
        move_in_date: date ? { lte: new Date(date) } : undefined,
      },
      orderBy: { created_at: 'desc' }, // 최신순 정렬
      include: { listing_photos: true },
    });
    return listings.map((listing) => ({
      ...listing,
      rent_price: Number(listing.rent_price),
      deposit: listing.deposit ? Number(listing.deposit) : null,
      created_at: listing.created_at?.toISOString() ?? null,
      updated_at: listing.updated_at?.toISOString() ?? null,
      expires_at: listing.expires_at?.toISOString() ?? null,
      move_in_date: listing.move_in_date?.toISOString() ?? null,
    })) as SafeListing[];
  } catch (error: unknown) {
    throw new Error(String(error));
  }
}
