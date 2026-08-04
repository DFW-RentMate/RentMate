"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

interface ActionSidebarProps {
  targetProfileId: string; // 💡 스키마 기준 프로필 ID
  initialIsLiked?: boolean; // 💡 DB에서 불러온 초기값
  roommateName: string;
  budgetMin: number;
  budgetMax: number;
  city: string;
  email?: string;
  kakaoLink?: string;
}

export default function ActionSidebar({
  targetProfileId,
  initialIsLiked = false,
  roommateName,
  budgetMin,
  budgetMax,
  city,
  email = "example@email.com",
  kakaoLink = "https://open.kakao.com",
}: ActionSidebarProps) {
  const { data: session } = useSession();
  const loginModal = useLoginModal();

  // 💡 DB에서 가져온 값을 초기 상태로 설정
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLikeToggle = async () => {
    if (!session) {
      loginModal.onOpen();
      return;
    }

    // 1. Optimistic UI (클릭 직후 하트 상태 먼저 변경)
    const nextState = !isLiked;
    setIsLiked(nextState);

    // 2. 서버 API에 찜 추가/취소 요청
    try {
      const response = await fetch("/api/roommates/favorites", {
        method: nextState ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetProfileId }),
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
    } catch (error) {
      console.error(error);
      // 서버 에러 시 하트 색상 원래대로 되돌리기
      setIsLiked(!nextState);
      alert("찜하기 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleContactClick = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      alert(`${roommateName}님의 이메일(${email})이 복사되었습니다!`);
    } else {
      alert("등록된 이메일이 없습니다.");
    }
  };

  const handleKakaoClick = () => {
    if (kakaoLink) {
      window.open(kakaoLink, "_blank");
    } else {
      alert("등록된 카카오톡 오픈채팅 링크가 없습니다.");
    }
  };

  return (
    <aside className="w-full lg:w-80 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm h-fit sticky top-24">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {roommateName}님에게 연락하기
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {city} · ${budgetMin} - ${budgetMax}/월
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleContactClick}
          className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium rounded-xl transition shadow-sm flex items-center justify-center gap-2"
        >
          <span>💬</span>
          <span>연락하기</span>
        </button>

        {/* 찜하기 버튼 */}
        <button
          onClick={handleLikeToggle}
          className={`w-full py-3 px-4 border font-medium rounded-xl transition flex items-center justify-center gap-2 ${
            isLiked
              ? "border-red-500 text-red-500 bg-red-50"
              : "border-gray-200 hover:bg-gray-50 text-gray-700"
          }`}
        >
          <span>{isLiked ? "♥" : "♡"}</span>
          <span>{isLiked ? "찜 완료" : "찜하기"}</span>
        </button>

        <button
          onClick={handleKakaoClick}
          className="w-full py-3 px-4 bg-[#FEE500] hover:bg-[#e6cf00] text-[#191919] font-medium rounded-xl transition flex items-center justify-center gap-2"
        >
          <span>💬</span>
          <span>카카오톡으로 문의</span>
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4">
        연락 시 안전거래 수칙을 확인하세요.
      </p>
    </aside>
  );
}
