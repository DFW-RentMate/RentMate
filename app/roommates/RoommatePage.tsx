"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiPlus } from "react-icons/fi";

// 💡 새로 쪼개놓은 필터 컴포넌트들을 불러옵니다.
import CityCondition from "./conditions/CityCondition";
import BudgetCondition from "./conditions/BudgetCondition";
import GenderCondition from "./conditions/GenderCondition";

const RoommatePage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // 어떤 필터가 URL에 들어있는지 확인 (선택된 상태 체크)
  const city = params?.get("city");
  const minBudget = params?.get("minBudget");
  const maxBudget = params?.get("maxBudget");
  const gender = params?.get("gender");

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center pb-20">
      {/* 1. 상단 타이틀 및 프로필 등록 버튼 영역 */}
      <div className="w-full max-w-[1650px] px-6 lg:px-8 pt-5 pb-6 flex justify-between items-start">
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

      {/* 2. 필터 영역 */}
      <div className="w-full border-y border-gray-200 bg-white">
        <div className="w-full max-w-[1650px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* 컴포넌트로 분리된 개별 필터들 */}
            <CityCondition selected={city != null} />
            <BudgetCondition
              selected={minBudget != null || maxBudget != null}
            />
            <GenderCondition selected={gender != null} />

            {/* 조건이 하나라도 걸려있을 때만 등장하는 '초기화' 버튼 */}
            {(city || minBudget || maxBudget || gender) && (
              <span
                className="text-sm text-gray-500 ml-2 hover:text-[#ff6b4a] hover:underline cursor-pointer"
                onClick={() => router.push(pathname)}
              >
                초기화
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. 리스트 영역 (<RoommateLists />가 이 자리에 쏙 들어감) */}
      <div className="w-full max-w-[1650px] px-6 lg:px-8 mt-8">{children}</div>
    </div>
  );
};

export default RoommatePage;
