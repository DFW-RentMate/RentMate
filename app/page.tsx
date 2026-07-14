"use client";

import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { TbUserSearch } from "react-icons/tb";
import HeroMapSection from "./HeroMapSection";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ffebe2] via-[#feece6] to-white flex flex-col items-center pt-24 pb-16 px-6 lg:px-12 xl:px-16">
      {/* 1. 상단 히어로 섹션 */}
      {/* max-w-7xl 대신 max-w-[1500px]를 사용하여 양옆 마진을 줄이고 공간을 넓게 씁니다. */}
      <div className="w-full max-w-[1600px] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 px-0">
        {/* 좌측: 타이틀 및 버튼 (왼쪽으로 바짝 붙도록 너비 고정) */}
        <div className="w-full lg:max-w-[550px] xl:max-w-[650px] shrink-0 flex flex-col items-start gap-6">
          <span className="bg-primary text-[#ffebec] text-sm font-semibold px-3 py-1 rounded-full">
            다래방 · DFW 한인 커뮤니티
          </span>

          <h1 className="text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-tight tracking-tight">
            DFW 지역에서 룸렌트와
            <br />
            룸메이트를 가장 쉽게
            <br />
            구하는 방법
          </h1>

          <p className="text-lg text-gray-500 font-light">
            매물 검색부터 룸메이트 매칭까지, 믿을 수 있는 한인 커뮤니티
            <br />
            렌트 플랫폼입니다.
          </p>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => router.push("/listings")}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-[#e8603a] text-white h-11 px-6 rounded-lg text-[15px] font-medium shadow-sm transition-all"
            >
              <FiSearch className="w-4 h-4" />
              매물 검색
            </button>

            <button
              onClick={() => router.push("/roommates")}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 h-11 px-6 rounded-lg text-[15px] font-bold shadow-sm transition-all"
            >
              <TbUserSearch className="w-4 h-4" />
              룸메이트 찾기
            </button>
          </div>

          <div className="flex items-start gap-3 mt-4 text-sm font-medium text-gray-500 w-full">
            <span className="whitespace-nowrap pt-1 font-light">
              서비스 지역
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Richardson",
                "Plano",
                "Allen",
                "Frisco",
                "Carrollton",
                "Dallas",
                "Irving",
                "Denton",
                "Arlington",
                "Lewisville",
                "McKinney",
                "Coppell",
                "Garland",
                "기타 DFW 지역",
              ].map((city) => (
                <span
                  key={city}
                  className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm text-gray-600 text-[13px]"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 3D 지도 및 프로필 카드 섹션 (제자리 유지) */}
        <div className="flex-1 w-full flex justify-center lg:justify-end xl:justify-center mt-12 lg:mt-0">
          <HeroMapSection />
        </div>
      </div>

      {/* 2. 하단 3구역 특징 섹션 */}
      {/* 갭(gap)을 늘려서 카드들이 양옆으로 더 넓게 퍼지도록 조정 */}
      <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mt-32 px-0">
        <div className="bg-white/80 backdrop-blur-sm py-5 px-6 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-50 w-full">
          <div className="w-12 h-12 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">DFW 5개 도시</h4>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Richardson ~ Carrollton
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm py-5 px-6 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-50 w-full">
          <div className="w-12 h-12 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">한인 커뮤니티</h4>
            <p className="text-[13px] text-gray-500 mt-0.5">
              믿을 수 있는 매칭
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm py-5 px-6 rounded-2xl flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-50 w-full">
          <div className="w-12 h-12 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">찜 · 연락</h4>
            <p className="text-[13px] text-gray-500 mt-0.5">
              간편한 저장 & 문의
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
