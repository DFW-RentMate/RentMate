import { FiHeart, FiMapPin } from "react-icons/fi";

interface ProfileCardProps {
  initial: string;
  name: string;
  age: number;
  city: string;
  preference: string;
  minBudget: number;
  maxBudget: number;
  bio: string;
  isLiked?: boolean;
}

export default function ProfileCard({
  initial,
  name,
  age,
  city,
  preference,
  minBudget,
  maxBudget,
  bio,
  isLiked = false,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full flex flex-col h-full cursor-pointer">
      {/* 1. 상단: 아바타, 이름, 나이, 지역, 찜 버튼 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-lg shrink-0">
            {initial}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-[15px]">
                {name}
              </span>
              <span className="text-gray-400 text-sm font-medium">{age}세</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
              <FiMapPin className="w-3 h-3" />
              {city} · {preference}
            </div>
          </div>
        </div>

        <button className="text-gray-300 hover:text-[#ff6b4a] transition-colors p-1">
          {isLiked ? (
            <svg
              className="w-5 h-5 text-[#ff6b4a] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <FiHeart className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 2. 중단: 예산 금액 */}
      <div className="mb-4">
        <span className="text-lg font-extrabold text-gray-900">
          ${minBudget.toLocaleString()} ~ ${maxBudget.toLocaleString()}
        </span>
        <span className="text-xs text-gray-400 font-medium ml-1">/월</span>
      </div>

      {/* 3. 하단: 자기소개 */}
      <div className="mt-auto">
        <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg line-clamp-2">
          "{bio}"
        </p>
      </div>
    </div>
  );
}
