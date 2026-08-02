import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { IRoommateParams } from "../page";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface RoommateListsProps {
  searchParams: IRoommateParams;
}

export default async function RoommateLists({
  searchParams,
}: RoommateListsProps) {
  const dbProfiles = await prisma.roommate_profiles.findMany({
    include: { users: true },
  });

  const profiles = dbProfiles.map((p) => {
    const user = p.users;
    const age = user?.birth_date
      ? new Date().getFullYear() - new Date(user.birth_date).getFullYear()
      : 25;
    const preferenceKor =
      p.preferred_roommate_gender === "Any"
        ? "무관 선호"
        : p.preferred_roommate_gender === "M"
          ? "남성 선호"
          : "여성 선호";

    return {
      id: p.id,
      initial: user?.name ? user.name.charAt(0) : "?",
      name: user?.name || "익명",
      age,
      city: p.desired_city || "미정",
      preference: preferenceKor,
      minBudget: Number(p.budget_min),
      maxBudget: Number(p.budget_max),
      bio: p.self_intro || "안녕하세요! 룸메이트를 찾고 있습니다.",
      isLiked: false,
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
      const koreanGender =
        searchParams.gender.split(" ")[0] +
        " " +
        searchParams.gender.split(" ")[1];
      if (
        profile.preference !== koreanGender &&
        profile.preference !== "무관 선호"
      )
        return false;
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

      {/* 💡 그리드 정렬 수정: h-full을 사용하여 모든 카드가 같은 높이를 갖도록 설정 */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Link
              key={profile.id}
              href={`/roommates/${profile.id}`}
              className="block h-full"
            >
              <div className="h-full">
                <ProfileCard
                  initial={profile.initial}
                  name={profile.name}
                  age={profile.age}
                  city={profile.city}
                  preference={profile.preference}
                  minBudget={profile.minBudget}
                  maxBudget={profile.maxBudget}
                  bio={profile.bio}
                  isLiked={profile.isLiked}
                />
              </div>
            </Link>
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
