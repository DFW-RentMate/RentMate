"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiPlus, FiEdit3 } from "react-icons/fi";
import useLoginModal from "@/hooks/useLoginModal";

export default function ProfileActionButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const loginModal = useLoginModal();

  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  // 💡 로그인한 유저의 기존 프로필 여부 확인
  useEffect(() => {
    if (!session?.user) {
      setHasProfile(false);
      setLoading(false);
      return;
    }

    fetch("/api/roommates")
      .then((res) => res.json())
      .then((data) => {
        setHasProfile(!!data.profile);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [session]);

  const handleClick = () => {
    if (!session) {
      loginModal.onOpen();
      return;
    }
    router.push("/roommates/new");
  };

  if (loading) {
    return (
      <button
        disabled
        className="bg-gray-200 text-gray-400 px-5 py-2.5 rounded-full text-sm font-bold animate-pulse"
      >
        확인 중...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-[#ff6b4a] hover:bg-[#e8603a] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all"
    >
      {hasProfile ? (
        <>
          <FiEdit3 className="w-4 h-4" />내 프로필 수정
        </>
      ) : (
        <>
          <FiPlus className="w-4 h-4" />내 프로필 등록
        </>
      )}
    </button>
  );
}
