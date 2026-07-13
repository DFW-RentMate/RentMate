"use client";

import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { TbUserSearch } from "react-icons/tb";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f2d8ce] via-[#e8e1d9] to-[#dfe3e7] flex flex-col items-center pt-24 pb-16 px-6">
      {/* 1. 상단 히어로 섹션 (좌측 텍스트 & 우측 플로팅 카드) */}
      {/* 👇 수정 포인트: max-w-7xl 컨테이너의 패딩을 줄여 왼쪽 컨텐츠를 더 왼쪽으로 이동시킴 (px-6 lg:px-12 -> px-0 lg:px-4) */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 px-0 lg:px-4">
        {/* 좌측: 타이틀 및 버튼 */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <span className="bg-[#ff6b4a] text-[#ffebec] text-sm font-semibold px-3 py-1 rounded-full">
            다래방 · DFW 한인 커뮤니티
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            DFW 지역에서 룸렌트와
            <br />
            룸메이트를 가장 쉽게
            <br />
            구하는 방법
          </h1>

          <p className="text-lg text-gray-500 font-medium">
            매물 검색부터 룸메이트 매칭까지, 믿을 수 있는 한인 커뮤
            <br />
            니티 렌트 플랫폼입니다.
          </p>

          {/* 버튼 그룹 */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => router.push("/listings")}
              className="flex items-center justify-center gap-2 bg-[#ff6b4a] hover:bg-[#e8603a] text-white h-10 px-5 rounded-lg text-sm font-bold shadow-sm transition-all"
            >
              <FiSearch className="w-4 h-4" />
              매물 검색
            </button>

            <button
              onClick={() => router.push("/roommates")}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 h-10 px-5 rounded-lg text-sm font-bold shadow-sm transition-all"
            >
              <TbUserSearch className="w-4 h-4" />
              룸메이트 찾기
            </button>
          </div>

          {/* 서비스 지역 태그 */}
          <div className="flex items-start gap-3 mt-4 text-sm font-medium text-gray-500 w-full">
            <span className="whitespace-nowrap pt-1">서비스 지역</span>
            <div className="flex flex-wrap gap-2">
              {/* 스크린샷에 있는 도시들 모두 추가 */}
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

        {/* 우측: 겹쳐진 플로팅 프로필 카드 UI */}
        {/* 👇 수정 포인트: 컨테이너 패딩 감소로 인한 오른쪽 카드 이동을 상쇄하기 위해 pr-8 추가 */}
        <div className="flex-1 relative w-full h-[350px] flex justify-center items-center mt-10 lg:mt-0 pr-0 lg:pr-8">
          {/* 1. 뒤쪽 서브 프로필 카드 */}
          <div className="absolute z-0 -translate-x-5 -translate-y-5 w-full max-w-md h-[100px] bg-white/80 backdrop-blur-sm py-2 px-6 rounded-2xl shadow-sm border border-gray-100">
            {/* 프로필 뼈대 */}
            <div className="flex items-center gap-4 mb-2 opacity-30 mt-1">
              <div className="w-11 h-11 bg-gray-300 rounded-full shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* 하단 텍스트 뼈대 */}
            <div className="w-full h-4 bg-gray-200 rounded opacity-30 mt-1"></div>
          </div>

          {/* 2. 메인 프로필 카드 */}
          <div className="relative z-10 bg-white py-2 px-6 rounded-2xl shadow-xl border border-gray-50 w-full max-w-md h-[115px]">
            {/* 좌측 둥둥 떠 있는 'NEW' 배지 */}
            <div className="absolute -left-10 top-4 bg-white py-2 px-3 rounded-xl shadow-lg border border-gray-50 flex flex-col items-center justify-center">
              <span className="text-[11px] font-extrabold text-[#ff6b4a] mb-0.5">
                NEW
              </span>
              <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
                이번 주 등록
              </span>
            </div>

            {/* 상단 태그 */}
            <div className="flex justify-end mb-0.5">
              <span className="text-[11px] font-semibold text-[#ff6b4a] bg-[#fff0ea] border border-[#ffe4de] px-3 py-0.5 rounded-full">
                개인실 Private
              </span>
            </div>

            {/* 프로필 영역 */}
            <div className="flex items-center gap-4 mb-1">
              <div className="w-9 h-9 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-base shrink-0">
                김
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  김민준 · 28세
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Richardson · $600~900
                </p>
              </div>
            </div>

            {/* 하단 텍스트 */}
            <p className="text-xs text-gray-600 mb-0 truncate">
              UTD 대학원생입니다. 조용하고 깔끔한 생활을 선호해요.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 하단 특징 특징 섹션 (여기는 변경 없음) */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-28 px-6 lg:px-12">
        {/* 특징 1 */}
        <div className="bg-white/80 backdrop-blur-sm py-4 px-5 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50">
          <div className="w-10 h-10 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-[15px]">
              DFW 5개 도시
            </h4>
            <p className="text-xs text-gray-500">Richardson ~ Carrollton</p>
          </div>
        </div>

        {/* 특징 2 */}
        <div className="bg-white/80 backdrop-blur-sm py-4 px-5 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50">
          <div className="w-10 h-10 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-[15px]">
              한인 커뮤니티
            </h4>
            <p className="text-xs text-gray-500">믿을 수 있는 매칭</p>
          </div>
        </div>

        {/* 특징 3 */}
        <div className="bg-white/80 backdrop-blur-sm py-4 px-5 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50">
          <div className="w-10 h-10 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-[15px]">찜 · 연락</h4>
            <p className="text-xs text-gray-500">간편한 저장 & 문의</p>
          </div>
        </div>
      </div>
    </main>
  );
}
