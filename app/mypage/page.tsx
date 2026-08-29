import Link from "next/link";
import {
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Users,
  Home,
  Heart,
  Plus,
} from "lucide-react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getMyListings } from "@/app/actions/getMyListings";
import { getFavoriteIds } from "@/app/actions/getFavoriteIds";
import prisma from "@/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function MyPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        로그인이 필요한 페이지입니다.
      </div>
    );
  }

  // 1. 내 매물 데이터 및 개수 가져오기
  const myListings = await getMyListings();
  const myListingsCount = myListings.length;

  // 2. 찜 개수 계산 (기존 getFavoriteIds 활용 + 룸메이트 찜 개수 합산)
  const favoriteListingIds = await getFavoriteIds();
  const roommateFavoritesCount = await prisma.roommate_favorites.count({
    where: { user_id: currentUser.id },
  });
  const totalFavoritesCount =
    favoriteListingIds.length + roommateFavoritesCount;

  // 3. 룸메이트 프로필 존재 여부 확인
  const hasRoommateProfile =
    currentUser.roommate_profiles && currentUser.roommate_profiles.length > 0;

  // 💡 4. 룸메이트 프로필의 실제 매칭 활성화(노출) 여부 확인
  const roommateProfile = hasRoommateProfile
    ? currentUser.roommate_profiles[0]
    : null;
  const isMatchingActive = roommateProfile?.matching_active ?? false;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">마이페이지</h1>
        <p className="text-sm text-gray-500">
          계정 정보와 등록한 콘텐츠를 관리하세요.
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8">
        {/* ── 좌측: 프로필 카드 ── */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col mb-6">
              <div className="w-16 h-16 bg-[#FFEAE3] text-[#FF6B4A] rounded-full flex items-center justify-center text-2xl font-bold mb-4 overflow-hidden">
                {currentUser.profile_photo_url ? (
                  <img
                    src={currentUser.profile_photo_url}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  currentUser.name?.charAt(0) || "유"
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentUser.name || "사용자"}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{currentUser.email}</p>

              {hasRoommateProfile ? (
                <span className="w-fit px-2.5 py-1 text-xs font-semibold text-[#b63d29] bg-[#FBE7DC] rounded-full">
                  룸메이트 프로필 등록됨
                </span>
              ) : (
                <span className="w-fit px-2.5 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full">
                  룸메이트 프로필 미등록
                </span>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400" />
                <span
                  className={
                    currentUser.phone_number ? "" : "text-gray-400 italic"
                  }
                >
                  {currentUser.phone_number || "연락처 미등록"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-gray-400" />
                <span>
                  {currentUser.created_at
                    ? new Date(currentUser.created_at).toLocaleDateString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "가입일 정보 없음"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 우측: 통계 및 메뉴 리스트 ── */}
        <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">찜</div>
              <div className="text-2xl font-bold text-gray-900">
                {totalFavoritesCount}개
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">내 매물</div>
              <div className="text-2xl font-bold text-gray-900">
                {myListingsCount}개
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-2">
            <div className="px-4 py-3 text-sm font-bold text-gray-900">
              메뉴
            </div>

            <Link
              href="/roommates/me"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF6B4A]">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    룸메이트 프로필
                  </div>
                  <div className="text-xs text-gray-500">
                    매칭 조건 · 생활 습관 수정
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasRoommateProfile ? (
                  isMatchingActive ? (
                    <span className="px-2 py-0.5 text-[11px] font-semibold text-[#b63d29] bg-[#FBE7DC] rounded-full">
                      노출 중
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[11px] font-semibold text-gray-500 bg-gray-100 rounded-full">
                      숨김
                    </span>
                  )
                ) : null}
                <ChevronRight
                  size={18}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
              </div>
            </Link>

            <Link
              href="/mylists"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF6B4A]">
                  <Home size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">내 매물</div>
                  <div className="text-xs text-gray-500">등록한 매물 관리</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {myListingsCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold text-[#b63d29] bg-[#FBE7DC] rounded-full">
                    {myListingsCount}개
                  </span>
                )}
                <ChevronRight
                  size={18}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
              </div>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF6B4A]">
                  <Heart size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">찜 목록</div>
                  <div className="text-xs text-gray-500">
                    저장한 매물 · 룸메이트
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {totalFavoritesCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold text-[#b63d29] bg-[#FBE7DC] rounded-full">
                    {totalFavoritesCount}개
                  </span>
                )}
                <ChevronRight
                  size={18}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
              </div>
            </Link>

            <Link
              href="/listings/new"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <Plus size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">매물 등록</div>
                  <div className="text-xs text-gray-500">새 방 렌트 올리기</div>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
              />
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-2">계정</h3>
            <p className="text-xs text-gray-500 mb-4">
              Google 또는 Kakao 계정으로 로그인되어 있습니다. 연락처는
              매물·룸메이트 문의 시에만 사용됩니다.
            </p>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
