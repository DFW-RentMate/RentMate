import { FiMapPin, FiBriefcase } from "react-icons/fi";

// 💡 1. 나이 계산 및 공개여부 처리 함수
const getDisplayAge = (
  customAge: number | null | undefined,
  birthDate: Date | null,
  isAgePublic: boolean,
) => {
  // 나이 공개 토글이 꺼져 있으면 무조건 비공개 처리
  if (!isAgePublic) return "· 나이 비공개";

  // 1순위: 프로필 작성할 때 직접 적은 나이(age)가 있으면 우선 사용
  if (customAge !== null && customAge !== undefined && customAge !== 0) {
    return `${customAge}세`;
  }

  // 2순위: 직접 적은 나이가 없다면 생년월일(birth_date)로 만 나이 계산
  if (!birthDate) return "· 나이 비공개";
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return `${age}세`;
};

// 💡 2. 날짜를 'YYYY. M. D.' 형식으로 바꿔주는 함수
const formatDate = (date: Date | null) => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
};

// props로 page.tsx에서 넘겨준 profile 데이터를 받습니다.
export default function ProfileHeader({ profile }: { profile: any }) {
  // profile.users 안에 이름, 생일 등의 정보가 들어있음
  const user = profile.users;

  // DB에서 넘어온 나이 공개 여부 (기본값 true)
  const isAgePublic = profile.is_age_public ?? true;

  // 💡 3. 성별 코드를 한국어로 변환 (profile 테이블 우선, 없으면 users 테이블 조회)
  const gender = profile.gender || user?.gender;
  const genderKor = gender === "M" ? "남성" : gender === "F" ? "여성" : "";

  // 💡 4. 직업/소속 정보 (profile 테이블 우선, 없으면 users 테이블 조회)
  const occupation = profile.occupation || user?.occupation_type;

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
      {/* 상단: 프로필 이미지 및 기본 정보 */}
      <div className="flex items-start gap-5">
        <div className="w-18 h-18 rounded-full bg-[#fcefee] text-[#ff6b4a] flex items-center justify-center text-2xl font-bold shrink-0">
          {user?.profile_photo_url ? (
            <img
              src={user.profile_photo_url}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            user?.name?.[0] || "익"
          )}
        </div>

        {/* 이름, 성별+나이, 뱃지, 등록일, 지역+직업 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">
              {user?.name || "익명"}
            </h2>

            {/* 💡 [성별 · 나이]를 함께 표시! 예: 남성 · 25세 */}
            <span className="text-sm font-medium text-gray-500">
              {genderKor && `${genderKor} · `}
              {getDisplayAge(profile.age, user?.birth_date, isAgePublic)}
            </span>

            {/* 매칭 활성화 상태일 때만 뱃지 표시 */}
            {profile.matching_active && (
              <span className="ml-1 px-2 py-0.5 bg-[#ff6b4a] text-white text-[11px] font-bold rounded-full">
                매칭 중
              </span>
            )}
          </div>

          <div className="text-sm text-gray-500 space-y-1 mt-1.5">
            {/* 💡 [지역 · 직업/소속] 아이콘과 함께 표시 */}
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-gray-600">
                <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                {profile.desired_city}
              </span>

              {occupation && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="inline-flex items-center gap-1 font-medium text-gray-700">
                    <FiBriefcase className="w-3.5 h-3.5 text-gray-400" />
                    {occupation}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-gray-400">
              등록일 {formatDate(profile.created_at)}
            </p>
          </div>
        </div>
      </div>

      {/* 하단: 예산 */}
      <div className="mt-6 flex items-end gap-1">
        <span className="text-3xl font-extrabold text-gray-900">
          ${Number(profile.budget_min)} - ${Number(profile.budget_max)}
        </span>
        <span className="text-gray-500 font-medium pb-1">/ 월</span>
      </div>
    </div>
  );
}
