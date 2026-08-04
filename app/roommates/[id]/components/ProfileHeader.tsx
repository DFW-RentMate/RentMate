import { FiMapPin } from "react-icons/fi";

// 💡 1. 생년월일을 받아서 만 나이로 변환해 주는 함수
const calculateAge = (birthDate: Date | null) => {
  if (!birthDate) return "나이 비공개";
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

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
      {/* 상단: 프로필 이미지 및 기본 정보 */}
      <div className="flex items-start gap-5">
        {/* 💡 수정됨: w-[72px] h-[72px] flex-shrink-0 -> w-18 h-18 shrink-0 */}
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

        {/* 이름, 나이, 뱃지, 등록일, 지역 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">
              {user?.name || "익명"}
            </h2>
            <span className="text-sm font-medium text-gray-500">
              {calculateAge(user?.birth_date)}
            </span>

            {/* 매칭 활성화 상태일 때만 뱃지 표시 */}
            {profile.matching_active && (
              <span className="ml-1 px-2 py-0.5 bg-[#ff6b4a] text-white text-[11px] font-bold rounded-full">
                매칭 중
              </span>
            )}
          </div>

          <div className="text-sm text-gray-400 space-y-0.5">
            <p>등록일 {formatDate(profile.created_at)}</p>
            <p className="flex items-center gap-1">
              <FiMapPin className="w-3.5 h-3.5" /> {profile.desired_city}
            </p>
          </div>
        </div>
      </div>

      {/* 하단: 예산 (이미지와 똑같이 크고 진하게 표시) */}
      <div className="mt-6 flex items-end gap-1">
        <span className="text-3xl font-extrabold text-gray-900">
          ${Number(profile.budget_min)} - ${Number(profile.budget_max)}
        </span>
        <span className="text-gray-500 font-medium pb-1">/ 월</span>
      </div>
    </div>
  );
}
