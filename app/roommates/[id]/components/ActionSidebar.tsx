"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import { FiPhone, FiMail, FiMessageCircle, FiHeart } from "react-icons/fi";

interface ActionSidebarProps {
  targetProfileId: string;
  initialIsLiked?: boolean;
  roommateName: string;
  budgetMin: number;
  budgetMax: number;
  city: string;
  phone?: string | null; // 💡 신규: 휴대폰 번호
  email?: string | null; // 💡 신규: 이메일 주소
  kakaoId?: string | null; // 💡 신규: 카카오톡 ID (선택)
}

export default function ActionSidebar({
  targetProfileId,
  initialIsLiked = false,
  roommateName,
  budgetMin,
  budgetMax,
  city,
  phone,
  email,
  kakaoId,
}: ActionSidebarProps) {
  const { data: session } = useSession();
  const loginModal = useLoginModal();

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleLikeToggle = async () => {
    if (!session) {
      loginModal.onOpen();
      return;
    }

    const nextState = !isLiked;
    setIsLiked(nextState);

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
      setIsLiked(!nextState);
      alert("찜하기 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 💡 클립보드 복사 공통 핸들러 (+ 버튼 시각 피드백)
  const handleCopy = (text: string, type: string, label: string) => {
    if (!text) {
      alert(`등록된 ${label} 정보가 없습니다.`);
      return;
    }
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    alert(`${roommateName}님의 ${label}(${text})이(가) 복사되었습니다!`);

    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
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
        {/* 1. 휴대폰 번호 복사 버튼 (필수) */}
        {phone && (
          <button
            onClick={() => handleCopy(phone, "phone", "휴대폰 번호")}
            className="w-full py-3 px-4 bg-[#ff6b4a] hover:bg-[#e55a3b] active:bg-[#d44d30] text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
          >
            <FiPhone className="w-4 h-4" />
            <span>
              {copiedType === "phone"
                ? "✓ 전화번호 복사 완료!"
                : "전화번호로 연락하기"}
            </span>
          </button>
        )}

        {/* 2. 이메일 복사 버튼 (필수) */}
        {email && (
          <button
            onClick={() => handleCopy(email, "email", "이메일")}
            className="w-full py-3 px-4 border border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <FiMail className="w-4 h-4 text-gray-500" />
            <span>
              {copiedType === "email"
                ? "✓ 이메일 복사 완료!"
                : "이메일로 연락하기"}
            </span>
          </button>
        )}

        {/* 3. 카카오톡 ID 복사 버튼 (입력되어 있을 때만 조건부 표시) */}
        {kakaoId && (
          <button
            onClick={() => handleCopy(kakaoId, "kakao", "카카오톡 ID")}
            className="w-full py-3 px-4 bg-[#FEE500] hover:bg-[#e6cf00] active:bg-[#d9c400] text-[#191919] font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <FiMessageCircle className="w-4 h-4" />
            <span>
              {copiedType === "kakao"
                ? "✓ 카카오톡 ID 복사 완료!"
                : "카카오톡으로 문의"}
            </span>
          </button>
        )}

        {/* 4. 찜하기 버튼 */}
        <button
          onClick={handleLikeToggle}
          className={`w-full py-3 px-4 border font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 ${
            isLiked
              ? "border-red-500 text-red-500 bg-red-50"
              : "border-gray-200 hover:bg-gray-50 text-gray-700"
          }`}
        >
          <FiHeart
            className={`w-4 h-4 ${isLiked ? "fill-current text-red-500" : ""}`}
          />
          <span>{isLiked ? "찜 완료" : "찜하기"}</span>
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4">
        연락 시 안전거래 수칙을 확인하세요.
      </p>
    </aside>
  );
}
