// app/HeroMapSection.tsx
"use client";

export default function HeroMapSection() {
  return (
    <div
      className="relative w-full h-[500px] flex justify-center items-center overflow-visible"
      style={{ perspective: "1200px" }}
    >
      {/* 1. 3D로 바닥에 깔린 지도 */}
      <div
        className="w-[600px] h-[450px] rounded-[80px] shadow-2xl relative border-4 border-white/20"
        style={{
          transform: "rotateX(45deg) rotateZ(10deg)",
          transformStyle: "preserve-3d",
          backgroundImage: "url('/dfw-map.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: "rotateX(-45deg) rotateZ(10deg) translateZ(20px)",
          }}
        >
          <div className="w-6 h-6 bg-[#ff6b4a] rounded-full border-4 border-white shadow-lg animate-bounce" />
        </div>
      </div>

      {/* 2. 2겹 프로필 카드 */}
      <div className="absolute top-[10%] right-[5%] z-20 w-[450px]">
        <div className="relative">
          {/* 뒤쪽 카드 */}
          <div className="absolute top-0 left-0 w-[420px] h-[100px] bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
            {/* 📸 매물 사진 대용 주황색 사각형 (왼쪽으로 이동: left-10 -> left-6) */}
            <div className="absolute top-3 left-4 w-[76px] h-[76px] bg-[#ffe4de] rounded-2xl"></div>

            {/* 개인실 버튼 (사각형 이동에 맞춰 왼쪽으로 이동: left-[130px] -> left-[108px]) */}
            <div className="absolute top-3 left-[100px]">
              <span className="text-[11px] font-semibold text-[#ff6b4a] bg-[#fff0ea] border border-[#ffe4de] px-3 py-1 rounded-full">
                개인실 Private
              </span>
            </div>
          </div>

          {/* NEW 배지 (왼쪽으로 비례해서 이동: -left-2 -> -left-6) */}
          <div className="absolute -left-6 top-5 z-10 bg-white py-2 px-3 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center justify-center">
            <span className="text-[11px] font-extrabold text-[#ff6b4a]">
              NEW
            </span>
            <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
              이번 주 등록
            </span>
          </div>

          {/* 앞쪽 카드 (위치 그대로 유지하여 뒤쪽 요소들이 더 잘 보이도록 함) */}
          <div className="absolute top-8 left-9 z-20 w-[420px] h-[90px] bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-sm shrink-0">
              김
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[15px]">
                김민준 · 28세
              </h3>
              <p className="text-[12px] text-gray-500">Richardson · $600~900</p>
              <p className="text-[12px] text-gray-500 mt-1 truncate">
                UTD 대학원생입니다. 조용하고 깔끔한 생활을 선호해요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
