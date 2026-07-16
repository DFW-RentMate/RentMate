"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

interface CityConditionProps {
  selected: boolean; // URL에 도시 조건이 있는지 부모(RoommatePage)가 알려줌
}

export default function CityCondition({ selected }: CityConditionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 이 드롭다운 창이 열렸는지 닫혔는지 관리
  const [isOpen, setIsOpen] = useState(false);

  // URL에서 현재 선택된 도시 값 가져오기
  const selectedCity = searchParams.get("city");

  // 도시 클릭 시 실행되는 함수
  const handleCityClick = (city: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // 이미 선택된 도시를 다시 누르면 필터 해제, 아니면 새 도시 설정
    if (selectedCity === city) {
      params.delete("city");
    } else {
      params.set("city", city);
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className="flex items-center gap-3 relative">
      <span className="text-sm text-gray-400 font-medium shrink-0">도시</span>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-[220px] px-4 py-2 bg-white rounded-xl text-sm transition-colors focus:outline-none ${
            isOpen || selected
              ? "border-2 border-[#ff6b4a] text-gray-900 font-medium"
              : "border border-gray-300 text-gray-500 hover:border-gray-400"
          }`}
        >
          {selectedCity ? selectedCity : "도시 검색 (예: Plano)"}
          <FiChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-[#ff6b4a]" : "text-gray-400"}`}
          />
        </button>

        {/* 도시 리스트 팝업 */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
            {[
              "Carrollton",
              "Richardson",
              "Plano",
              "Frisco",
              "Dallas",
              "Irving",
              "Denton",
              "Arlington",
            ].map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                // 현재 선택된 도시라면 주황색 배경과 글씨로 하이라이트!
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  selectedCity === city
                    ? "bg-[#fff0ea] text-[#ff6b4a] font-bold"
                    : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
