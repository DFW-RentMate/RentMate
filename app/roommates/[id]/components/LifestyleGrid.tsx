import {
  FiSun,
  FiMoon,
  FiStar,
  FiXCircle,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";

// 💡 시간 데이터(DateTime)를 '오전/오후 h:mm' 형태로 바꿔주는 함수
const formatTime = (timeData: Date | null) => {
  if (!timeData) return "미입력";
  const d = new Date(timeData);
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시는 12시로 표시
  return `${hours}:${minutes} ${ampm}`;
};

export default function LifestyleGrid({ profile }: { profile: any }) {
  // DB의 cleanliness_level 값에 따른 텍스트 매핑
  const getCleanlinessText = (level: number | null) => {
    if (!level) return "미입력";
    if (level >= 4) return `${level}/5 · 깔끔`;
    if (level === 3) return `${level}/5 · 보통`;
    return `${level}/5 · 털털`;
  };

  // DB의 선호 성별 값 매핑
  const getGenderPrefText = (pref: string | null) => {
    if (pref === "M") return "남성 Only";
    if (pref === "F") return "여성 Only";
    return "무관 Any";
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        생활 습관 Lifestyle
      </h3>

      {/* 화면 크기에 따라 모바일 2칸, 태블릿/PC 3칸으로 자동 조절 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* 1. 기상 시간 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <FiSun className="text-[#ff6b4a]" /> 기상
          </div>
          <div className="font-bold text-gray-900">
            {formatTime(profile.wake_up_time)}
          </div>
        </div>

        {/* 2. 취침 시간 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <FiMoon className="text-[#ff6b4a]" /> 취침
          </div>
          <div className="font-bold text-gray-900">
            {formatTime(profile.sleep_time)}
          </div>
        </div>

        {/* 3. 청결도 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <FiStar className="text-[#ff6b4a]" /> 청결도
          </div>
          <div className="font-bold text-gray-900">
            {getCleanlinessText(profile.cleanliness_level)}
          </div>
        </div>

        {/* 4. 흡연 여부 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            {profile.smoking ? (
              <FiCheckCircle className="text-red-500" />
            ) : (
              <FiXCircle className="text-gray-400" />
            )}
            흡연
          </div>
          <div className="font-bold text-gray-900">
            {profile.smoking ? "흡연자" : "비흡연"}
          </div>
        </div>

        {/* 5. 반려동물 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <MdOutlinePets className="text-[#ff6b4a]" /> 반려동물
          </div>
          <div className="font-bold text-gray-900">
            {profile.pets_ok ? "가능" : "불가"}
          </div>
        </div>

        {/* 6. 선호 성별 */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <FiUser className="text-[#ff6b4a]" /> 선호 성별
          </div>
          <div className="font-bold text-gray-900">
            {getGenderPrefText(profile.preferred_roommate_gender)}
          </div>
        </div>
      </div>
    </div>
  );
}
