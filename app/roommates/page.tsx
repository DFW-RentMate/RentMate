"use client";

import { useRouter } from "next/navigation";
import ProfileCard from "./ProfileCard";
import { FiPlus } from "react-icons/fi";

// 💡 백엔드 DB가 연결되기 전까지 화면을 테스트할 더미 데이터
const DUMMY_PROFILES = [
  {
    id: 1,
    initial: "김",
    name: "김민준",
    age: 28,
    city: "Richardson",
    preference: "무관 선호",
    minBudget: 600,
    maxBudget: 900,
    bio: "UTD 대학원생입니다. 조용하고 깔끔한 생활을 선호해요. 주말에는 카페에서 공부하거나 등산을 즐깁니다.",
    isLiked: true,
  },
  {
    id: 2,
    initial: "이",
    name: "이서연",
    age: 29,
    city: "Plano",
    preference: "여성 선호",
    minBudget: 700,
    maxBudget: 1100,
    bio: "직장인 2년차입니다. 반려묘 1마리와 함께 살 예정이에요. 깔끔하고 서로 존중하는 룸메이트를 찾습니다.",
    isLiked: true,
  },
  {
    id: 3,
    initial: "박",
    name: "박지훈",
    age: 26,
    city: "Frisco",
    preference: "남성 선호",
    minBudget: 500,
    maxBudget: 800,
    bio: "IT 회사 신입입니다. 게임이랑 요리 좋아해요. 공용 공간은 가끔 어지러워도 방은 깔끔하게 유지합니다.",
    isLiked: false,
  },
  {
    id: 4,
    initial: "최",
    name: "최유나",
    age: 31,
    city: "Allen",
    preference: "여성 선호",
    minBudget: 650,
    maxBudget: 950,
    bio: "간호사로 일하고 있어요. 교대 근무라 시간이 들쭉날쭉할 수 있지만 조용히 지낼 수 있는 분이면 좋겠습니다.",
    isLiked: false,
  },
  {
    id: 5,
    initial: "정",
    name: "정현우",
    age: 28,
    city: "Carrollton",
    preference: "무관 선호",
    minBudget: 550,
    maxBudget: 850,
    bio: "프리랜서 디자이너입니다. 야행성이라 밤에 작업하는 경우가 많아요. 흡연은 발코니에서만 합니다.",
    isLiked: false,
  },
  {
    id: 6,
    initial: "한",
    name: "한소희",
    age: 26,
    city: "Richardson",
    preference: "무관 선호",
    minBudget: 600,
    maxBudget: 1000,
    bio: "UTD 학부생 3학년이에요. 공부 위주로 생활하고 주말엔 한인교회 봉사 활동을 합니다. 깔끔한 분 환영!",
    isLiked: false,
  },
  {
    id: 7,
    initial: "오",
    name: "오태양",
    age: 31,
    city: "Plano",
    preference: "남성 선호",
    minBudget: 800,
    maxBudget: 1200,
    bio: "마케팅 매니저로 일합니다. 강아지 키우고 있어서 펫 프렌들리 하우스를 찾고 있어요. 운동 좋아합니다.",
    isLiked: false,
  },
];

export default function RoommatesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center pb-20">
      {/* 1. 상단 타이틀 및 프로필 등록 버튼 영역 */}
      <div className="w-full max-w-6xl px-6 lg:px-8 pt-12 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            룸메이트 찾기
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            DFW 한인 커뮤니티 룸메이트 매칭
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#ff6b4a] hover:bg-[#e8603a] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all">
          <FiPlus className="w-4 h-4" />내 프로필 등록
        </button>
      </div>

      {/* 2. 필터 영역 (팀원 코드의 스타일 차용) */}
      <div className="w-full border-y border-gray-200 bg-white">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-4 flex flex-col gap-4">
          {/* 도시 필터 */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 font-medium shrink-0">
              도시
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Richardson", "Plano", "Allen", "Frisco", "Carrollton"].map(
                (city) => (
                  <button
                    key={city}
                    className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-[#ff6b4a] hover:text-[#ff6b4a] transition-colors whitespace-nowrap"
                  >
                    {city}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* 예산 및 성별 필터 (UI 뼈대) */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
              예산 $400~2,000+
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <button className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
              성별 선호
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 프로필 카드 그리드 영역 */}
      <div className="w-full max-w-6xl px-6 lg:px-8 mt-8">
        {/* 결과 카운트 */}
        <div className="mb-4 text-sm font-medium text-gray-600">
          <span className="font-bold text-gray-900">
            {DUMMY_PROFILES.length}명
          </span>{" "}
          · 룸메이트 프로필
        </div>

        {/* 3열 그리드 레이아웃 (모바일 1열, 태블릿 2열, 데스크탑 3열) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_PROFILES.map((profile) => (
            <ProfileCard
              key={profile.id}
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
          ))}
        </div>
      </div>
    </div>
  );
}
