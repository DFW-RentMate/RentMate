"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// 💡 1. 스마트 등록/수정 버튼 import (우측 상단 유지)
import ProfileActionButton from "./components/ProfileActionButton";

// 💡 2. 매물 페이지의 공통 필터(도시, 예산) + 우리가 이미 가지고 있던 룸메이트 전용 성별 필터 import
import Search from "@/app/listings/conditions/Search";
import Price from "@/app/listings/conditions/PriceCondition";
import GenderCondition from "./conditions/GenderCondition";

const RoommatePage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // 💡 URL 파라미터 값 읽기
  const city = params?.get("city");
  const price = params?.get("min");
  const maxPrice = params?.get("max");
  const gender = params?.get("gender");

  // 필터가 하나라도 켜져 있는지 확인 (초기화 버튼 표시용)
  const hasAnyFilter = !!(city || price || maxPrice || gender);

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center pb-20">
      {/* 1. 상단 타이틀 & 내 프로필 등록/수정 버튼 영역 */}
      <div className="w-full max-w-[1650px] px-6 lg:px-8 pt-5 pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            룸메이트 찾기
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            DFW 한인 커뮤니티 룸메이트 매칭
          </p>
        </div>

        {/* 💡 똑똑한 프로필 버튼 위치 */}
        <ProfileActionButton />
      </div>

      {/* 2. 필터 영역 */}
      <div className="w-full border-y border-gray-300 bg-white">
        <div className="w-full max-w-[1650px] mx-auto px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 1) 도시 검색 (Search Combobox) */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 pr-1 shrink-0 text-sm font-medium">
                도시
              </span>
              <div className="w-70 border border-background rounded-xl">
                <Search />
              </div>
            </div>

            {/* 2) 예산 범위(Price) & 룸메이트 전용 성별 필터(GenderCondition) */}
            <div className="flex gap-2 flex-wrap items-center ml-2">
              <Price selected={price != null || maxPrice != null} />
              <GenderCondition selected={gender != null} />

              {/* 3) 조건이 하나라도 걸려있을 때만 등장하는 '초기화' 버튼 */}
              {hasAnyFilter && (
                <span
                  className="text-sm text-gray-500 mt-1 hover:text-gray-600 hover:underline cursor-pointer"
                  onClick={() => router.push(pathname)}
                >
                  초기화
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. 리스트 영역 (RoommateLists 컴포넌트가 이 자리에 들어감) */}
      <div className="w-full max-w-[1650px] px-6 lg:px-8 mt-8">{children}</div>
    </div>
  );
};

export default RoommatePage;
