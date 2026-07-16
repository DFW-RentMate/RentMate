import ProfileCard from "./ProfileCard"; // 💡 파일 위치에 맞게 경로 확인 필요
import { IRoommateParams } from "../page"; // page.tsx에서 만든 타입 가져오기

// 백엔드 DB가 연결되기 전까지 사용할 더미 데이터
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

interface RoommateListsProps {
  searchParams: IRoommateParams;
}

export default function RoommateLists({ searchParams }: RoommateListsProps) {
  // page.tsx에서 내려받은 조건들로 데이터를 필터링
  const filteredProfiles = DUMMY_PROFILES.filter((profile) => {
    // 1. 도시 필터
    if (searchParams.city && profile.city !== searchParams.city) {
      return false;
    }

    // 2. 예산 필터 (사용자가 설정한 예산 범위 내에 프로필의 예산이 겹치는지 확인)
    const filterMin = searchParams.minBudget
      ? Number(searchParams.minBudget)
      : 0;
    const filterMax = searchParams.maxBudget
      ? Number(searchParams.maxBudget)
      : 3000;
    if (profile.maxBudget < filterMin || profile.minBudget > filterMax) {
      return false;
    }

    // 3. 성별 필터 (URL에는 '여성 선호 Female' 형태이므로 앞의 한글만 잘라서 비교)
    if (searchParams.gender) {
      const koreanGender =
        searchParams.gender.split(" ")[0] +
        " " +
        searchParams.gender.split(" ")[1];
      if (
        profile.preference !== koreanGender &&
        profile.preference !== "무관 선호"
      ) {
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
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-gray-500">
          <p>조건에 맞는 룸메이트가 없습니다.</p>
          <p className="text-sm mt-2">다른 조건으로 검색해 보세요!</p>
        </div>
      )}
    </>
  );
}
