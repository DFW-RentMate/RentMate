import { FiHeart } from "react-icons/fi";

// 외부에서 카드에 주입할 데이터의 타입 정의
interface ProfileCardProps {
  initial: string;
  name: string;
  age: number;
  city: string;
  preference: string;
  minBudget: number;
  maxBudget: number;
  bio: string;
  isLiked?: boolean; // 찜 여부 (선택)
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
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full flex flex-col gap-3 cursor-pointer">
      {/* 1. 상단: 아바타, 이름, 나이, 지역, 찜 버튼 */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* 아바타 이니셜 */}
          <div className="w-10 h-10 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-lg shrink-0">
            {initial}
          </div>

          {/* 유저 정보 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-[15px]">
                {name}
              </span>
              <span className="text-gray-400 text-sm font-medium">{age}세</span>
            </div>
            <div className="text-[12px] text-gray-500 mt-0.5">
              {city} · {preference}
            </div>
          </div>
        </div>

        {/* 찜(하트) 버튼 */}
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
      <div className="mt-1">
        <span className="text-xl font-extrabold text-gray-900">
          ${minBudget}~${maxBudget}
        </span>
        <span className="text-sm text-gray-500 font-medium"> /월</span>
      </div>

      {/* 3. 하단: 생활 패턴 아이콘 (현재는 UI용 더미 SVG 배치) */}
      <div className="flex items-center gap-2.5 text-gray-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M12 2v20M17 5l-10 14M7 5l10 14" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M12 2v20M17 5l-10 14M7 5l10 14" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M12 2v20M17 5l-10 14M7 5l10 14" />
        </svg>
      </div>

      {/* 4. 최하단: 자기소개 (2줄 넘어가면 ... 처리되도록 line-clamp 적용) */}
      <p className="text-[13px] text-gray-500 leading-relaxed mt-1 line-clamp-2">
        {bio}
      </p>
    </div>
  );
}
