"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

interface GenderConditionProps {
  selected: boolean;
}

export default function GenderCondition({ selected }: GenderConditionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // URL에서 선택된 성별을 가져오고, 없으면 기본 텍스트 표시
  const selectedGender = searchParams.get("gender") || "성별 선호";

  const handleGenderClick = (gender: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // "전체 All"을 누르면 필터를 해제해서 모든 사람이 보이게 함
    if (gender === "전체 All") {
      params.delete("gender");
    } else {
      params.set("gender", gender);
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false); // 선택 후 창 닫기
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium transition-colors focus:outline-none ${
          isOpen || selected
            ? "border-2 border-[#ff6b4a] text-gray-900"
            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {/* 선택된 성별이 길면(예: 남성 선호 Male) 앞부분 한글만 잘라서 텍스트로 보여줌 */}
        {selectedGender === "성별 선호"
          ? selectedGender
          : selectedGender.split(" ")[0]}
        <FiChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-[#ff6b4a]" : "text-gray-400"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[180px] bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
          {["전체 All", "여성 선호 Female", "남성 선호 Male"].map((option) => (
            <button
              key={option}
              onClick={() => handleGenderClick(option)}
              className={`w-full text-left px-5 py-3 text-[15px] font-medium transition-colors ${
                selectedGender === option
                  ? "bg-[#fff0ea] text-[#ff6b4a]" // 선택된 항목 하이라이트
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
