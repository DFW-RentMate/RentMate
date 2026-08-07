import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export type FavoriteRoommate = {
  id: string;
  user_id: string;
  desired_city: string;
  budget_min: number | null;
  budget_max: number | null;
  self_intro: string | null;
  move_in_date: string | null;
  smoking: boolean | null;
  pets_ok: boolean | null;
  preferred_roommate_gender: string | null;
  users: {
    name: string | null;
    profile_photo_url: string | null;
    gender: string | null;
    occupation_type: string | null;
  };
};

export async function getFavoriteRoommates(): Promise<FavoriteRoommate[]> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!userId) return [];

  const favorites = await prisma.roommate_favorites.findMany({
    where: { user_id: userId },
    include: {
      roommate_profiles: {
        include: { users: true },
      },
    },
  });

  return favorites.map((f) => ({
    ...f.roommate_profiles,
    budget_min: f.roommate_profiles.budget_min
      ? Number(f.roommate_profiles.budget_min)
      : null,
    budget_max: f.roommate_profiles.budget_max
      ? Number(f.roommate_profiles.budget_max)
      : null,
    move_in_date: f.roommate_profiles.move_in_date?.toISOString() ?? null,
    users: {
      name: f.roommate_profiles.users.name,
      profile_photo_url: f.roommate_profiles.users.profile_photo_url,
      gender: f.roommate_profiles.users.gender,
      occupation_type: f.roommate_profiles.users.occupation_type,
    },
  }));
}
