import { notFound } from "next/navigation";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getServerSession } from "next-auth";

import ProfileHeader from "./components/ProfileHeader";
import LifestyleGrid from "./components/LifestyleGrid";
import MoveInDate from "./components/MoveInDate";
import AboutSection from "./components/AboutSection";
import ActionSidebar from "./components/ActionSidebar";
import RoommateEmptyState from "./RoommateEmptyState"; // 💡 새로 만든 빈 상태 컴포넌트 임포트

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function RoommateProfilePage({
  params,
}: ProfilePageProps) {
  const { id } = await params;
  const session = await getServerSession();

  let targetId = id;

  // 💡 1. 만약 주소가 "/roommates/me"로 들어왔다면 로그인한 유저의 실제 프로필 ID를 찾음
  if (id === "me") {
    if (!session?.user?.email) {
      notFound();
    }

    const currentUser = await prisma.users.findUnique({
      where: { email: session.user.email },
      include: { roommate_profiles: true },
    });

    // 등록된 프로필이 없을 때 404 대신 RoommateEmptyState 반환
    if (
      !currentUser ||
      !currentUser.roommate_profiles ||
      currentUser.roommate_profiles.length === 0
    ) {
      return <RoommateEmptyState />;
    }

    // 유저가 가진 첫 번째 룸메이트 프로필의 실제 UUID로 targetId 변경
    targetId = currentUser.roommate_profiles[0].id;
  }

  // 💡 2. 실제 UUID(`targetId`)로 룸메이트 프로필 정보 조회
  const profile = await prisma.roommate_profiles.findUnique({
    where: { id: targetId },
    include: {
      users: true,
    },
  });

  if (!profile) {
    notFound();
  }

  // 로그인한 사용자의 기존 찜 여부(initialIsLiked) 확인 로직
  let initialIsLiked = false;
  let isOwner = false; // 💡 현재 유저가 이 프로필의 주인인지 여부

  if (session?.user?.email) {
    const currentUser = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (currentUser) {
      // 소유자 판별
      if (profile.user_id === currentUser.id) {
        isOwner = true;
      }

      // 찜 여부 확인
      const favoriteRecord = await prisma.roommate_favorites.findFirst({
        where: {
          user_id: currentUser.id,
          target_profile_id: targetId,
        },
      });

      initialIsLiked = !!favoriteRecord;
    }
  }

  // Prisma의 Decimal 에러를 방지하기 위해 일반 숫자로 변환
  const safeProfile = {
    ...profile,
    budget_min: Number(profile.budget_min),
    budget_max: Number(profile.budget_max),
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] pt-6 pb-20">
      <div className="w-full max-w-300 mx-auto px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/roommates"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            룸메이트 찾기로 Back to roommates
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full space-y-8">
            <ProfileHeader profile={safeProfile} />
            <LifestyleGrid profile={safeProfile} />
            <MoveInDate date={safeProfile.move_in_date} />
            <AboutSection intro={safeProfile.self_intro} />
          </div>

          <div className="w-full lg:w-[320px] shrink-0 sticky top-24">
            <ActionSidebar
              targetProfileId={safeProfile.id}
              initialIsLiked={initialIsLiked}
              roommateName={safeProfile.users?.name ?? "익명"}
              budgetMin={Number(safeProfile.budget_min ?? 0)}
              budgetMax={Number(safeProfile.budget_max ?? 0)}
              city={safeProfile.desired_city}
              phone={safeProfile.phone ?? safeProfile.users?.phone_number}
              email={safeProfile.email ?? safeProfile.users?.email}
              kakaoId={safeProfile.kakao_id ?? safeProfile.users?.kakao_id}
              isOwner={isOwner} // 💡 ActionSidebar로 소유자 여부 전달 완료!
            />
          </div>
        </div>
      </div>
    </div>
  );
}
