import { notFound } from "next/navigation";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getServerSession } from "next-auth"; // 💡 NextAuth 세션 조회용 import

import ProfileHeader from "./components/ProfileHeader";
import LifestyleGrid from "./components/LifestyleGrid";
import MoveInDate from "./components/MoveInDate";
import AboutSection from "./components/AboutSection";
import ActionSidebar from "./components/ActionSidebar";

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
  const session = await getServerSession(); // 💡 현재 로그인한 사용자 세션 확인

  // 룸메이트 프로필 정보 조회
  const profile = await prisma.roommate_profiles.findUnique({
    where: { id: id },
    include: {
      users: true,
    },
  });

  if (!profile) {
    notFound();
  }

  // 💡 로그인한 사용자의 기존 찜 여부(initialIsLiked) 확인 로직
  let initialIsLiked = false;

  if (session?.user?.email) {
    const currentUser = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (currentUser) {
      const favoriteRecord = await prisma.roommate_favorites.findFirst({
        where: {
          user_id: currentUser.id,
          target_profile_id: id,
        },
      });

      initialIsLiked = !!favoriteRecord; // 찜 내역이 있으면 true, 없으면 false
    }
  }

  // 💡 Prisma의 Decimal 에러를 방지하기 위해 일반 숫자로 변환
  const safeProfile = {
    ...profile,
    budget_min: Number(profile.budget_min),
    budget_max: Number(profile.budget_max),
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] pt-6 pb-20">
      {/* 💡 max-w-[1200px] 대신 표준 권장 클래스인 max-w-300 적용 */}
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
            {/* 💡 변경됨: 신규 추가한 phone, email, kakaoId를 정확하게 전달 */}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
