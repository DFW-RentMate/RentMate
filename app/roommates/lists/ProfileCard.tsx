"use client";

import React, { useState } from "react";
import Link from "next/link"; // 💡 상세 페이지 이동을 위한 Link import
import { FiHeart, FiMapPin } from "react-icons/fi";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

interface ProfileCardProps {
  id: string; // 💡 DB 저장 및 대상 식별을 위해 꼭 필요한 프로필 ID
  initial: string;
  name: string;
  age: number;
  city: string;
  preference: string;
  minBudget: number;
  maxBudget: number;
  bio: string;
  isLiked?: boolean;
}

export default function ProfileCard({
  id,
  initial,
  name,
  age,
  city,
  preference,
  minBudget,
  maxBudget,
  bio,
  isLiked = false,
}: ProfileCardProps) {
  const { data: session } = useSession();
  const loginModal = useLoginModal();

  // 💡 1. 찜하기 상태 관리 (초기값은 DB에서 받아온 isLiked)
  const [liked, setLiked] = useState(isLiked);

  // 💡 2. 하트 버튼 클릭 핸들러 (이벤트 버블링 차단 + API 연동)
  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 🔥 상위 <Link> 태그의 페이지 이동 이벤트를 완벽하게 차단!
    e.preventDefault();
    e.stopPropagation();

    // 로그인하지 않은 사용자는 전역 로그인 모달 띄우기
    if (!session) {
      loginModal.onOpen();
      return;
    }

    // 화면의 하트 UI를 먼저 빠르게 변경 (Optimistic UI)
    const nextState = !liked;
    setLiked(nextState);

    // 백엔드 API 호출로 DB에 저장/삭제 반영
    try {
      const response = await fetch("/api/roommates/favorites", {
        method: nextState ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetProfileId: id }),
      });

      if (!response.ok) {
        throw new Error("찜하기 API 요청 실패");
      }
    } catch (error) {
      console.error(error);
      // 서버 저장 실패 시 하트 색상 롤백
      setLiked(!nextState);
      alert("찜하기 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    // 🔥 Tailwind 경고 해결: 맨 뒤의 'block'을 제거하고 'flex flex-col'만 유지
    <Link
      href={`/roommates/${id}`}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full flex flex-col h-full cursor-pointer relative"
    >
      {/* 1. 상단: 아바타, 이름, 나이, 지역, 찜 버튼 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-lg shrink-0">
            {initial}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-[15px]">
                {name}
              </span>
              <span className="text-gray-400 text-sm font-medium">{age}세</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
              <FiMapPin className="w-3 h-3" />
              {city} · {preference}
            </div>
          </div>
        </div>

        {/* 💡 찜하기 버튼: handleLikeClick의 preventDefault/stopPropagation으로 링크 이동 방지! */}
        <button
          onClick={handleLikeClick}
          className="text-gray-300 hover:text-[#ff6b4a] transition-colors p-1 relative z-10"
          aria-label="찜하기"
        >
          {liked ? (
            <svg
              className="w-5 h-5 text-[#ff6b4a] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <FiHeart className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 2. 중단: 예산 금액 */}
      <div className="mb-4">
        <span className="text-lg font-extrabold text-gray-900">
          ${minBudget.toLocaleString()} ~ ${maxBudget.toLocaleString()}
        </span>
        <span className="text-xs text-gray-400 font-medium ml-1">/월</span>
      </div>

      {/* 3. 하단: 자기소개 */}
      <div className="mt-auto">
        <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg line-clamp-2">
          "{bio}"
        </p>
      </div>
    </Link>
  );
}
