'use client';

import { useState } from 'react';
import { SafeListing } from '../types';
import ListCard from '../listings/lists/ListCard';

interface favoritesClientProps {
  listings: SafeListing[];
}

const FavoritesClient = ({ listings }: favoritesClientProps) => {
  const [tab, setTab] = useState<'매물' | '룸메이트'>('매물');
  const [favoritedIds, setFavoritedIds] = useState<string[]>(
    listings.map((l) => l.id),
  );
  const visibleListings = listings.filter((t) => favoritedIds.includes(t.id));

  const handleFavoriteToggle = (id: string, result: boolean) => {
    if (result) {
      setFavoritedIds((prev) => [...prev, id]);
    } else {
      setFavoritedIds((prev) => prev.filter((f) => f !== id));
    }
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-6 bg-[#f0ede9] p-1 rounded-2xl w-fit">
        {(['매물', '룸메이트'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
            w-45 
            py-2 
            rounded-xl 
            font-medium 
            text-sm border 
            transition-colors
            cursor-pointer
            ${tab === t ? 'bg-white border-white text-black shadow-sm' : 'bg-transparent border-transparent text-gray-400'}
            `}
          >
            {t === '매물' ? `매물 (${visibleListings.length})` : '룸메이트 (0)'}
          </button>
        ))}
      </div>

      {tab == '매물' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleListings.map((listing) => (
            <ListCard
              key={listing.id}
              listing={listing}
              isSelected={false}
              isFavorited={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesClient;
