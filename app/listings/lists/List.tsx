'use client';
import Image from 'next/image';

const List = () => {
  return (
    <div className="flex gap-3 px-2 items-center bg-white w-full h-36 border border-gray-200 rounded-2xl shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer sm:gap-4">
      <div className="relative w-32 h-32 shrink-0  ">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
          alt="listing"
          fill
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col ">
        <div className="mt-1 w-fit bg-[#FBE7DC] rounded-2xl px-2 h-auto text-sm text-[#b63d29]">
          개인실 Private
        </div>
        <div className="flex flex-col">
          <div className="pt-4 h-auto text-lg font-semibold">
            Richardson 다운타운 근처 밝은 개인실
          </div>
          <div className="h-auto text-sm text-gray-400 font-light">
            Richardson TX (Spring Valley Rd 인근)
          </div>
        </div>
        <div className="flex items-baseline">
          <div className="rounded-2xl mt-2 h-auto text-xl font-semibold">
            $ 750
          </div>
          <div className="text-gray-600 font-light">/ 월</div>
        </div>
      </div>
    </div>
  );
};

export default List;
