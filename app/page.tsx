"use client";

import { useRouter } from "next/navigation"; // 👈 페이지 이동을 위한 Next.js 훅 추가!
import Button from "./components/Button";
import { FiSearch } from "react-icons/fi";
import { TbUserSearch } from "react-icons/tb";

export default function Home() {
  const router = useRouter(); // 👈 라우터 객체 생성

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff0ea] via-[#fdfbf9] to-[#f9fafb] flex flex-col items-center pt-24 pb-16 px-6">
      {/* 1. 상단 히어로 섹션 (좌측 텍스트 & 우측 플로팅 카드) */}
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* 좌측: 타이틀 및 버튼 */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <span className="bg-[#ffebec] text-[#ff6b4a] text-sm font-semibold px-3 py-1 rounded-full">
            다래방 · DFW 한인 커뮤니티
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            달라스·포트워스에서 방과 룸<br />
            메이트를 가장 쉽게 찾는 방법
          </h1>

          <p className="text-lg text-gray-500 font-medium">
            매물 검색부터 룸메이트 매칭까지, 믿을 수 있는 한인 커뮤
            <br />
            니티 렌트 플랫폼입니다.
          </p>

          {/* 버튼 그룹 (라우팅 연결 추가) */}
          <div className="flex items-center gap-4 mt-2">
            <Button
              label="매물 검색"
              icon={FiSearch}
              onClick={() => router.push("/listings")} // 👈 클릭 시 /listings 페이지로 이동
            />
            <Button
              label="룸메이트 찾기"
              outline={true}
              icon={TbUserSearch}
              onClick={() => router.push("/roommates")} // 룸메이트 페이지 주소가 정해지면 이 주석을 풀고 연결하면 돼!
            />
          </div>

          {/* 서비스 지역 태그 */}
          <div className="flex items-center gap-3 mt-4 text-sm font-medium text-gray-500">
            <span>서비스 지역</span>
            <div className="flex gap-2">
              {["Richardson", "Plano", "Allen", "Frisco", "Carrollton"].map(
                (city) => (
                  <span
                    key={city}
                    className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm text-gray-600"
                  >
                    {city}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* 우측: 플로팅 프로필 카드 UI */}
        <div className="flex-1 relative w-full h-[300px] flex justify-center items-center">
          {/* 뒤쪽 희미한 배경 카드 요소 */}
          <div className="absolute top-10 right-20 w-[300px] h-[100px] bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white"></div>

          {/* 메인 프로필 카드 */}
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 w-full max-w-sm ml-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-[#ff6b4a] bg-[#ffebec] px-2 py-1 rounded-md">
                NEW 이번 주 등록
              </span>
              <span className="text-xs font-semibold text-gray-400">
                개인실 Private
              </span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-lg">
                김
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  김민준 · 28세
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Richardson · $600~900
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              UTD 대학원생입니다. 조용하고 깔끔한 생활을 선호해요.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 하단 3구역 특징 섹션 */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-28">
        {/* 특징 1 */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50">
          <div className="w-12 h-12 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">DFW 5개 도시</h4>
            <p className="text-sm text-gray-500">Richardson ~ Carrollton</p>
          </div>
        </div>

        {/* 특징 2 */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50">
          <div className="w-12 h-12 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">한인 커뮤니티</h4>
            <p className="text-sm text-gray-500">믿을 수 있는 매칭</p>
          </div>
        </div>

        {/* 특징 3 */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50">
          <div className="w-12 h-12 bg-[#fff0ea] text-[#ff6b4a] rounded-xl flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">찜 · 연락</h4>
            <p className="text-sm text-gray-500">간편한 저장 & 문의</p>
          </div>
        </div>
      </div>
    </main>
  );
}
