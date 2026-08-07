'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="group flex gap-1 items-center  transition-colors cursor-pointer rounded-full w-fit my-4 p-1"
    >
      <ChevronLeft size={15} className="text-gray-400 group-hover:text-black" />
      <span className="text-[#8e857d] font-light text-sm group-hover:text-black">
        이전 페이지로 Go back
      </span>
    </div>
  );
};

export default BackButton;
