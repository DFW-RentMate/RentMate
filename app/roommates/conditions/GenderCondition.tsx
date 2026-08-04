"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LuChevronDown } from "react-icons/lu";

interface GenderConditionProps {
  selected: boolean;
}

export default function GenderCondition({ selected }: GenderConditionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // URL에서 선택된 성별 가져오기
  const selectedGender = searchParams.get("gender") || "";

  // 💡 1. 바깥 영역 클릭 시 드롭다운 닫히는 로직 추가
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleGenderClick = (gender: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (gender === "전체") {
      params.delete("gender");
    } else {
      params.set("gender", gender);
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  // 💡 버튼에 표시할 텍스트
  const getDisplayText = () => {
    if (selectedGender === "여성 선호 Female") return "성별: 여성";
    if (selectedGender === "남성 선호 Male") return "성별: 남성";
    return "성별 선호";
  };

  return (
    <div className="relative" ref={ref}>
      {/* 💡 2. 다른 필터 버튼들(Price, Search)과 100% 동일한 패딩 및 rounded-2xl 스타일 적용 */}
      <div
        className={`
          shadow-sm text-sm flex items-center border py-1 px-3 rounded-2xl cursor-pointer hover:bg-gray-50 
          transition-colors duration-200
          ${selected || isOpen ? "border-primary text-primary" : "border-gray-200 text-gray-700"}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getDisplayText()}</span>
        <LuChevronDown
          className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </div>

      {/* 💡 3. 드롭다운 박스 스타일을 매물 페이지와 어울리게 통일 */}
      {isOpen && (
        <div className="absolute top-10 left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-md py-2 z-20">
          <div className="text-xs font-semibold text-gray-400 px-4 py-1 mb-1">
            성별 선호 Gender
          </div>
          {[
            { label: "전체 (All)", value: "전체" },
            { label: "남성 (Male)", value: "남성 선호 Male" },
            { label: "여성 (Female)", value: "여성 선호 Female" },
          ].map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedGender === option.value ||
                (option.value === "전체" && !selectedGender)
                  ? "bg-[#faefec] text-primary font-medium"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => handleGenderClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
