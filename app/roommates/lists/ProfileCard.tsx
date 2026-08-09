"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiHeart, FiMapPin, FiBriefcase } from "react-icons/fi";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

interface ProfileCardProps {
  id: string;
  initial: string;
  name: string;
  age?: number | null;
  isAgePublic?: boolean;
  gender?: string | null;
  occupation?: string | null;
  city: string;
  preference: string;
  minBudget: number;
  maxBudget: number;
  bio: string;
  isLiked?: boolean;
  profilePhotoUrl?: string | null;
  // 💡 찜 상태 변경 시 부모 컴포넌트에 알리기 위한 콜백 프롭스 추가
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void;
}

export default function ProfileCard({
  id,
  initial,
  name,
  age,
  isAgePublic = true,
  gender,
  occupation,
  city,
  preference,
  minBudget,
  maxBudget,
  bio,
  isLiked = false,
  profilePhotoUrl,
  onFavoriteToggle,
}: ProfileCardProps) {
  const { data: session } = useSession();
  const loginModal = useLoginModal();

  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      loginModal.onOpen();
      return;
    }

    const nextState = !liked;
    setLiked(nextState);

    // 💡 부모 컴포넌트에 찜 상태 변경 알림 (즉시 리스트에서 반영되도록 처리)
    if (onFavoriteToggle) {
      onFavoriteToggle(id, nextState);
    }

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
      setLiked(!nextState);
      // 서버 에러 발생 시 부모 쪽 상태도 원래대로 원복
      if (onFavoriteToggle) {
        onFavoriteToggle(id, !nextState);
      }
      alert("찜하기 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const genderKor = gender === "M" ? "남성" : gender === "F" ? "여성" : "";

  return (
    <Link
      href={`/roommates/${id}`}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full flex flex-col h-full cursor-pointer relative"
    >
      {/* 1. 상단: 아바타(사진 or 첫글자), 이름, 성별+나이, 지역+직업, 찜 버튼 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ffe4de] text-[#ff6b4a] rounded-full flex justify-center items-center font-bold text-lg shrink-0 overflow-hidden border border-gray-100">
            {profilePhotoUrl ? (
              <img
                src={profilePhotoUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-900 text-[15px]">
                {name}
              </span>
              <span className="text-gray-400 text-sm font-medium">
                {genderKor && `${genderKor} · `}
                {isAgePublic && age ? `${age}세` : "나이 비공개"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
              <FiMapPin className="w-3 h-3" />
              <span>{city}</span>
              <span>·</span>
              {occupation ? (
                <span className="flex items-center gap-0.5 text-gray-500 font-medium">
                  <FiBriefcase className="w-2.5 h-2.5" />
                  {occupation}
                </span>
              ) : (
                <span>{preference}</span>
              )}
            </div>
          </div>
        </div>

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
