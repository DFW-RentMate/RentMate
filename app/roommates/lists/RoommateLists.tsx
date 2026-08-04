import ProfileCard from "./ProfileCard";
import { IRoommateParams } from "../page";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getServerSession } from "next-auth"; // 💡 1. 현재 로그인 세션 확인용 import

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface RoommateListsProps {
  searchParams: IRoommateParams;
}

export default async function RoommateLists({
  searchParams,
}: RoommateListsProps) {
  // 💡 2. 현재 로그인한 사용자 세션 및 유저 ID 조회
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

  // 3. 룸메이트 프로필 및 로그인 유저의 찜 내역 같이 가져오기
  const dbProfiles = await prisma.roommate_profiles.findMany({
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
    const age = user?.birth_date
      ? new Date().getFullYear() - new Date(user.birth_date).getFullYear()
      : 25;
    const preferenceKor =
      p.preferred_roommate_gender === "Any"
        ? "무관 선호"
        : p.preferred_roommate_gender === "M"
          ? "남성 선호"
          : "여성 선호";

    // 💡 4. 현재 유저가 찜한 데이터가 배열에 존재하는지 여부로 isLiked 결정
    const isLiked =
      Array.isArray(p.roommate_favorites) && p.roommate_favorites.length > 0;

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
      isLiked, // 💡 실제 DB 찜 여부 반영
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

      {/* 💡 그리드 정렬: 외부 Link를 걷어내고 id={profile.id}를 완벽하게 전달 */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="h-full">
              <ProfileCard
                id={profile.id} // 🔥 핵심! 에러를 해결하는 id 프롭스 전달
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
