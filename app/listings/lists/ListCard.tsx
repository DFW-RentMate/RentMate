'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { SafeListing } from '@/app/types';
import { useRouter } from 'next/navigation';
import { toggleFavorite } from '@/app/actions/toggleFavorite';
import { useState } from 'react';

const ROOM_TYPE_LABEL: Record<string, string> = {
  Private: '개인실 Private',
  Shared: '쉐어룸 Shared',
  Studio: '스튜디오 Studio',
  Master_Bedroom: '마스터룸 Master',
};

interface listCardProps {
  listing: SafeListing;
  isSelected: boolean;
  isFavorited: boolean;
  onHover?: (id: string | null) => void;
  onFavoriteToggle: (id: string, result: boolean) => void;
}

const ListCard = ({
  listing,
  isSelected,
  onHover,
  isFavorited,
  onFavoriteToggle,
}: listCardProps) => {
  const photoUrl = listing.listing_photos?.[0]?.url;
  const router = useRouter();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await toggleFavorite(listing.id);
    onFavoriteToggle(listing.id, result);
  };

  return (
    <div
      id={`listing-${listing.id}`}
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => router.push(`/listings/${listing.id}`)}
      className={`flex gap-3 px-2 items-center bg-white w-full h-36 border border-gray-200 rounded-2xl shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer sm:gap-4 overflow-hidden
        ${isSelected ? 'border-2 border-primary' : 'border-gray-200'}
        `}
    >
      <div className="relative w-32 h-32 shrink-0  ">
        <Image
          src={photoUrl || '/placeholder.jpg'}
          alt={listing.title}
          fill
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-between self-stretch py-2 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="mt-1 w-fit bg-[#FBE7DC] py-[2px] rounded-2xl px-2 h-auto text-xs text-[#b63d29] ">
            {ROOM_TYPE_LABEL[listing.room_type]}
          </div>
          <Heart
            size={20}
            onClick={handleFavorite}
            className={
              isFavorited
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:fill-red-500 hover:text-red-500 transition-colors'
            }
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className=" h-auto text-md font-semibold line-clamp-2 leading-tight">
            {listing.title}
          </div>
          <div className="h-auto text-sm text-gray-400 font-light truncate">
            {listing.city} · TX{' '}
            {listing.address_raw ? `(${listing.address_raw} 인근)` : ''}
          </div>
        </div>
        <div className="flex items-baseline">
          <div className="rounded-2xlh-auto text-xl font-semibold">
            ${Number(listing.rent_price).toLocaleString()}
          </div>
          <div className="text-gray-400 font-light text-sm "> / 월</div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
