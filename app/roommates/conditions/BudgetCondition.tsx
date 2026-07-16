"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

interface BudgetConditionProps {
  selected: boolean;
}

export default function BudgetCondition({ selected }: BudgetConditionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 드롭다운 열림/닫힘 상태 (이제 이 컴포넌트 안에서만 관리함!)
  const [isOpen, setIsOpen] = useState(false);

  // 최소/최대 가격 상태
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  // 💡 URL에 값이 있으면 새로고침해도 슬라이더 위치가 유지되도록 세팅
  useEffect(() => {
    const urlMin = searchParams.get("minBudget");
    const urlMax = searchParams.get("maxBudget");
    if (urlMin) setMinPrice(Number(urlMin));
    if (urlMax) setMaxPrice(Number(urlMax));
  }, [searchParams]);

  // 슬라이더 조작 함수
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 50);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 50);
    setMaxPrice(value);
  };

  // 마우스/터치를 뗄 때 URL 업데이트
  const handleSliderRelease = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minBudget", minPrice.toString());
    params.set("maxBudget", maxPrice.toString());
    router.push(`${pathname}?${params.toString()}`);
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
        가격 ${minPrice} - ${maxPrice}
        {maxPrice >= 3000 && "+"}
        <FiChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-[#ff6b4a]" : "text-gray-400"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[320px] bg-white border border-gray-100 rounded-[20px] shadow-xl p-5 z-50">
          <h4 className="text-[17px] font-bold text-gray-900 mb-8 tracking-tight">
            월 렌트 범위 Rent range
          </h4>

          <div className="relative h-1.5 bg-gray-200 rounded-full mx-2 mb-5">
            <div
              className="absolute h-full bg-[#ff6b4a] rounded-full"
              style={{
                left: `${(minPrice / 3000) * 100}%`,
                right: `${100 - (maxPrice / 3000) * 100}%`,
              }}
            ></div>

            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={minPrice}
              onChange={handleMinChange}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="absolute w-full -top-1.5 h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#ff6b4a] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer z-20"
            />

            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={handleMaxChange}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="absolute w-full -top-1.5 h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#ff6b4a] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer z-30"
            />
          </div>

          <div className="flex justify-between text-[15px] font-medium text-gray-900 px-1">
            <span>${minPrice}</span>
            <span>
              ${maxPrice}
              {maxPrice >= 3000 && "+"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
