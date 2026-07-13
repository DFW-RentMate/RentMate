'use client';
import Image from 'next/image';

const List = () => {
  return (
    <div className="flex gap-3 p-2 bg-white w-full h-40 border border-gray-200 rounded-2xl shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer sm:gap-4">
      <div className="relative w-36 h-36 shrink-0  ">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
          alt="listing"
          fill
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="w-fit bg-[#FBE7DC] rounded-2xl px-2 h-auto text-sm text-primary">
          개인실 Private
        </div>
        <div className="flex flex-col">
          <div className="rounded-2xl px-2 h-auto text-md text-xl font-semibold">
            Richardson 다운타운 근처 밝은 개인실
          </div>
          <div className="rounded-2xl px-2 h-auto text-md text-gray-400 font-light">
            Richardson TX (Spring Valley Rd 인근)
          </div>
        </div>
        <div className="flex items-baseline">
          <div className="rounded-2xl px-1 h-auto text-md text-2xl font-semibold">
            $ 750
          </div>
          <div className="text-gray-600 font-light">/ 월</div>
        </div>
      </div>
    </div>
  );
};

export default List;
