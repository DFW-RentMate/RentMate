'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/listings')}
      className=" flex gap-1 items-center hover:bg-gray-100 transition-colors cursor-pointer rounded-full w-fit my-4 p-1"
    >
      <ChevronLeft size={15} color="#9ca3af" />
      <span className="text-[#8e857d] font-light text-sm">
        매물 검색으로 Back to search
      </span>
    </div>
  );
};

export default BackButton;
