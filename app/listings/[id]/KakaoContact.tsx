'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const KakaoContact = ({ kakaoId }: { kakaoId: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(kakaoId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full bg-[#FEE500] rounded-xl py-3 font-semibold text-[#3C1E1E] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#F0D900] transition-colors cursor-pointer"
    >
      {copied ? (
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
  );
};

export default KakaoContact;
