import ProfileCard from "./ProfileCard";
import { IRoommateParams } from "../page";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getServerSession } from "next-auth";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface RoommateListsProps {
  searchParams: IRoommateParams;
}

export default async function RoommateLists({
  searchParams,
}: RoommateListsProps) {
  const session = await getServerSession();
  let currentUserId: string | null = null;

  if (session?.user?.email) {
    const currentUser = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (currentUser) {
      currentUserId = currentUser.id;
    }
  }

  const dbProfiles = await prisma.roommate_profiles.findMany({
    where: {
      matching_active: true,
    },
    include: {
      users: true,
      roommate_favorites: currentUserId
        ? {
            where: { user_id: currentUserId },
          }
        : false,
    },
  });

  const profiles = dbProfiles.map((p) => {
    const user = p.users;

    const calculatedAge =
      p.age !== null && p.age !== undefined
        ? p.age
        : user?.birth_date
          ? new Date().getFullYear() - new Date(user.birth_date).getFullYear()
          : null;

    const isAgePublic = p.is_age_public ?? true;

    const preferenceKor =
      p.preferred_roommate_gender === "Any"
        ? "무관 선호"
        : p.preferred_roommate_gender === "M"
          ? "남성 선호"
          : "여성 선호";

    const isLiked =
      Array.isArray(p.roommate_favorites) && p.roommate_favorites.length > 0;

    return {
      id: p.id,
      initial: user?.name ? user.name.charAt(0) : "?",
      name: user?.name || "익명",
      age: calculatedAge,
      isAgePublic: isAgePublic,
      gender: p.gender || user?.gender || null,
      occupation: p.occupation || user?.occupation_type || null,
      city: p.desired_city || "미정",
      preference: preferenceKor,
      minBudget: Number(p.budget_min),
      maxBudget: Number(p.budget_max),
      bio: p.self_intro || "안녕하세요! 룸메이트를 찾고 있습니다.",
      isLiked,
      // 💡 신규 추가: 유저 테이블에 저장된 프로필 사진 URL 추출
      profilePhotoUrl: user?.profile_photo_url || null,
    };
  });

  const filteredProfiles = profiles.filter((profile) => {
    if (searchParams.city && profile.city !== searchParams.city) return false;

    const filterMin = searchParams.minBudget
      ? Number(searchParams.minBudget)
      : 0;
    const filterMax = searchParams.maxBudget
      ? Number(searchParams.maxBudget)
      : 3000;
    if (profile.maxBudget < filterMin || profile.minBudget > filterMax)
      return false;

    if (searchParams.gender) {
      const targetGender =
        searchParams.gender.includes("남") || searchParams.gender === "M"
          ? "M"
          : searchParams.gender.includes("여") || searchParams.gender === "F"
            ? "F"
            : "Any";

      if (targetGender !== "Any" && profile.gender !== targetGender) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <div className="mb-4 text-sm font-medium text-gray-600">
        <span className="font-bold text-gray-900">
          {filteredProfiles.length}명
        </span>{" "}
        · 룸메이트 프로필
      </div>

      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="h-full">
              <ProfileCard
                id={profile.id}
                initial={profile.initial}
                name={profile.name}
                age={profile.age}
                isAgePublic={profile.isAgePublic}
                gender={profile.gender}
                occupation={profile.occupation}
                city={profile.city}
                preference={profile.preference}
                minBudget={profile.minBudget}
                maxBudget={profile.maxBudget}
                bio={profile.bio}
                isLiked={profile.isLiked}
                // 💡 신규 추가: 카드 컴포넌트로 프로필 사진 URL 전달!
                profilePhotoUrl={profile.profilePhotoUrl}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-gray-500">
          <p>조건에 맞는 룸메이트가 없습니다.</p>
        </div>
      )}
    </>
  );
}
