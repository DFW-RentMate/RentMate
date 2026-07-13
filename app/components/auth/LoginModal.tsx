'use client';

import useLoginModal from '../../../hooks/useLoginModal';
import { X } from 'lucide-react';

export default function LoginModal() {
  const loginModal = useLoginModal();

  if (!loginModal.isOpen) {
    return null;
  }

  return (
    // 배경 오버레이 — 클릭하면 모달 닫힘
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={loginModal.onClose}
    >
      {/*
        실제 모달 박스
        onClick={(e) => e.stopPropagation()} 이 중요:
        박스 안쪽을 클릭했을 때는 배경의 onClose가 실행되지 않게 막아줌.
        이게 없으면 모달 안쪽 아무데나 눌러도 창이 닫혀버림.
      */}
      <div
        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={loginModal.onClose}
          className="absolute p-2 text-gray-500 transition-colors top-4 right-4 hover:bg-gray-100 rounded-full hover:text-gray-900"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <div className="text-center mt-2">
          <h2 className="text-2xl font-extrabold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-500">
            RentMate에 오신 것을 환영합니다!
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-8">

          <button
            className="flex items-center justify-center gap-2 w-full py-3.5 text-gray-700 bg-white border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            구글로 계속하기
          </button>

          <button
            className="flex items-center justify-center gap-2 w-full py-3.5 text-[#191919] bg-[#FEE500] rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            카카오로 계속하기
          </button>
        </div>

        <p className="mt-6 text-xs text-center text-gray-400">
          로그인 시 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
        </p>

      </div>
    </div>
  );
}