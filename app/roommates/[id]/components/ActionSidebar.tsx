"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import { Phone, Mail, Copy, Heart, Check } from "lucide-react"; // 💡 Check 아이콘 추가

interface ActionSidebarProps {
  targetProfileId: string;
  initialIsLiked?: boolean;
  roommateName: string;
  budgetMin: number;
  budgetMax: number;
  city: string;
  phone?: string | null;
  email?: string | null;
  kakaoId?: string | null;
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
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      loginModal.onOpen();
      return;
    }

    if (loading) return;
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: string, label: string) => {
    if (!text) {
      alert(`등록된 ${label} 정보가 없습니다.`);
      return;
    }
    navigator.clipboard.writeText(text);
    setCopiedType(type);

    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <aside className="w-full md:w-80 shrink-0">
      <div className="sticky top-24 border border-gray-200 rounded-2xl p-5 shadow-md bg-white flex flex-col gap-3">
        {/* 상단 예산 및 지역 */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">
              ${budgetMin.toLocaleString()} ~ ${budgetMax.toLocaleString()}
            </span>
            <span className="text-[#8e857d] text-sm">/ 월</span>
          </div>
          <div className="text-sm text-[#8e857d] mt-0.5">희망 지역: {city}</div>
        </div>

        {/* 1. 찜하기 버튼 (FavoriteButton 완벽 이식) */}
        <button
          onClick={handleLikeToggle}
          className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-100 transition-colors"
        >
          <Heart
            size={18}
            className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
          {isLiked ? "찜 완료" : "찜하기"}
        </button>

        {/* 2. 카카오톡 문의 버튼 (KakaoContact 완벽 이식) */}
        {kakaoId && (
          <button
            onClick={() => handleCopy(kakaoId, "kakao", "카카오톡 ID")}
            className="w-full bg-[#FEE500] rounded-xl py-3 font-semibold text-[#3C1E1E] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#F0D900] transition-colors"
          >
            {copiedType === "kakao" ? (
              <>
                <Check size={16} className="text-green-700" />
                아이디가 복사되었습니다
              </>
            ) : (
              <>
                <Copy size={16} />
                카카오톡으로 문의
              </>
            )}
          </button>
        )}

        {/* 3. 전화번호 연락 버튼 (PhoneContact 완벽 이식 - 클릭 시 바로 전화 연결) */}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="w-full bg-emerald-400 hover:bg-emerald-500 transition-colors rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone size={16} />
            {phone}
          </a>
        )}

        {/* 4. 이메일 복사 버튼 (스타일 통일) */}
        {email && (
          <button
            onClick={() => handleCopy(email, "email", "이메일")}
            className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-100 transition-colors"
          >
            {copiedType === "email" ? (
              <>
                <Check size={16} className="text-green-700" />
                이메일이 복사되었습니다
              </>
            ) : (
              <>
                <Mail size={16} className="text-gray-500" />
                이메일로 연락하기
              </>
            )}
          </button>
        )}

        <p className="text-xs text-[#8e857d] text-center mt-1">
          연락 시 안전거래 수칙을 확인하세요.
        </p>
      </div>
    </aside>
  );
}
