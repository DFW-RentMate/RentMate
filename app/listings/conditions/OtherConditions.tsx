"use client";

import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuSlidersHorizontal } from "react-icons/lu";
import Etc from "./Etc";
import Date from "./MoveInDate";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";

interface OtherConditionsProps {
  selected?: boolean;
}

const OtherConditions = ({ selected }: OtherConditionsProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const gender = params?.get("gender");

  const [showConditions, setShowConditions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowConditions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const clickGender = (g: string | null) => {
    const currentQuery = qs.parse(params?.toString());

    if (currentQuery.gender === g) {
      delete currentQuery.gender; // 같은 버튼 다시 누르면 취소
    } else {
      currentQuery.gender = g;
    }

    const url = qs.stringifyUrl(
      { url: pathname, query: currentQuery },
      { skipNull: true },
    );
    router.push(url);
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className={`
              shadow-sm text-sm flex items-center border py-1 px-3 rounded-2xl cursor-pointer hover:bg-gray-50 
              ${selected ? "border-primary" : "border-gray-200"}
              ${selected ? "text-primary" : ""}
            `}
        onClick={() => setShowConditions(!showConditions)}
      >
        <LuSlidersHorizontal className="mr-1" size={12} />
        <span>조건</span>
        <LuChevronDown className="ml-1" size={16} />
      </div>

      {showConditions && (
        <div className="absolute z-15 flex flex-col top-9 left-0 bg-white w-70 rounded-xl border border-gray-200 shadow-md py-2 px-4">
          <div className="text-sm font-medium p-0 m-0">
            성별 선호 Gender
            <div className="flex gap-1 justify-between items-center pt-2 pb-4">
              <div
                className={`
                  border px-6 py-2 rounded-lg cursor-pointer transition-colors
                  ${!gender ? "bg-[#fdd9ce] border-primary" : "bg-white hover:bg-[#fdeae4]"}
                `}
                onClick={() => {
                  const currentQuery = qs.parse(params?.toString());
                  delete currentQuery.gender;
                  const url = qs.stringifyUrl(
                    { url: pathname, query: currentQuery },
                    { skipNull: true },
                  );
                  router.push(url);
                }}
              >
                무관
              </div>
              <div
                className={`
                  border px-6 py-2 rounded-lg cursor-pointer transition-colors
                  ${gender === "M" ? "bg-[#fdd9ce] border-primary" : "bg-white hover:bg-[#fdeae4]"}
                `}
                onClick={() => clickGender("M")}
              >
                남성
              </div>
              <div
                className={`
                  border px-6 py-2 rounded-lg cursor-pointer transition-colors
                  ${gender === "F" ? "bg-[#fdd9ce] border-primary" : "bg-white hover:bg-[#fdeae4]"}
                `}
                onClick={() => clickGender("F")}
              >
                여성
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col py-3">
            <Etc label="반려동물 가능 Pets allowed" paramKey="pets" />
            <Etc label="주차 가능 Parking" paramKey="parking" />
            <Etc label="가구 포함 Furnished" paramKey="furnished" />
          </div>

          <hr className="mb-2" />
          <Date />
        </div>
      )}
    </div>
  );
};

export default OtherConditions;
