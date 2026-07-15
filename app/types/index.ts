import { listing_photos, listings } from '../generated/prisma/client';

export type SafeListing = Omit<
  listings,
  | 'rent_price'
  | 'deposit'
  | 'created_at'
  | 'updated_at'
  | 'expires_at'
  | 'move_in_date'
> & {
  rent_price: number;
  deposit: number | null;
  created_at: string | null;
  updated_at: string | null;
  expires_at: string | null;
  move_in_date: string | null;
  listing_photos: listing_photos[];
};
