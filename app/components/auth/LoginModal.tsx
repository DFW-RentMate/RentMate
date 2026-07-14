'use client';

import { signIn } from 'next-auth/react';
import useLoginModal from '../../../hooks/useLoginModal';
import { X, Home } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Link from 'next/link';

export default function LoginModal() {
  const loginModal = useLoginModal();

  if (!loginModal.isOpen) {
    return null;
  }

  return (
    // 배경 오버레이 — 클릭하면 닫힘
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={loginModal.onClose}
    >
      {/* 모달 박스 */}
      <div
        className="relative w-full max-w-xs mx-4 p-6 bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 우측 상단 닫기 버튼 */}
        <button
          onClick={loginModal.onClose}
          className="absolute p-1.5 text-gray-400 transition-colors top-4 right-4 hover:bg-gray-100 rounded-full hover:text-gray-700"
          aria-label="닫기"
        >
          <X size={18} />
        </button>

        {/* ── 로고 (가운데 정렬: justify-center 추가) ── */}
        <div className="flex items-center justify-center space-x-2.5">
          <div className="flex items-center justify-center w-9 h-9 text-white bg-[#FF6B4A] rounded-full">
            <Home size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-gray-900 tracking-tight leading-none">
              RoomRent <span className="text-[#FF6B4A]">DFW</span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium mt-0.5">
              달라스 한인 렌트
            </span>
          </div>
        </div>

        {/* ── 제목 + 부제 (가운데 정렬: text-center 추가) ── */}
        <div className="mt-5 text-center">
          <h2 className="text-lg font-extrabold text-gray-900">로그인</h2>
          <p className="mt-1 text-[13px] text-gray-500">
            DFW 한인 커뮤니티를 위한 룸렌트 플랫폼
          </p>
        </div>

        {/* ── 소셜 로그인 버튼들 ── */}
        <div className="flex flex-col gap-2.5 mt-5">

          {/* 구글 */}
          <button
            onClick={() => signIn('google')}
            className="flex items-center justify-center gap-2 w-full py-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            <FcGoogle size={18} />
            Google로 계속하기
          </button>

          {/* 카카오 */}
          <button
            onClick={() => signIn('kakao')}
            className="flex items-center justify-center gap-2 w-full py-3 text-sm text-[#191919] bg-[#FEE500] rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <RiKakaoTalkFill size={18} />
            카카오로 계속하기
          </button>
        </div>

        {/* ── 약관 문구 ── */}
        <p className="mt-5 text-[11px] leading-relaxed text-center text-gray-400">
          로그인 시{' '}
          <Link href="/terms" className="font-semibold text-gray-500 underline hover:text-gray-700">
            이용약관
          </Link>
          {' '}및{' '}
          <Link href="/privacy" className="font-semibold text-gray-500 underline hover:text-gray-700">
            개인정보처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>

      </div>
    </div>
  );
}