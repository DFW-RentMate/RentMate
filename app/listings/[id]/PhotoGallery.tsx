'use client';

import { listing_photos } from '@/app/generated/prisma/client';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const PhotoGallery = ({ photos }: { photos: listing_photos[] }) => {
  const [current, setCurrent] = useState(0);

  if (!photos || photos.length === 0)
    return (
      <div className="w-full h-96 bg-gray-100 rounded-2xl">
        <ImageOff size={48} className="text-gray-300" />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
        <Image
          src={photos[current].url}
          alt="listing photos"
          className="w-full h-full object-cover"
          fill
        />

        <button
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          className="absolute left-3 top-1/2 -translate-y-1/2  bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() =>
            setCurrent((prev) => Math.min(prev + 1, photos.length - 1))
          }
          className="absolute right-3 top-1/2 -translate-y-1/2  bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute right-3 bottom-3 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
          {current + 1}/{photos.length}
        </div>
      </div>

      {/* 썸네일 */}
      <div className="flex gap-2 overflow-x-auto">
        {photos.map((photo, i) => (
          <Image
            key={photo.id}
            src={photo.url}
            alt=""
            width={64}
            height={64}
            onClick={() => setCurrent(i)}
            className={`w-16 h-16 object-cover shrink-0 rounded-xl border-2 ${current === i ? 'border-primary' : 'border-transparent'} cursor-pointer`}
          ></Image>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
