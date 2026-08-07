'use client';

import { useState } from 'react';
import { SafeListing } from '../types';
import ListCard from '../listings/lists/ListCard';
import ProfileCard from '../roommates/lists/ProfileCard';
import { FavoriteRoommate } from '../actions/getFavoriteRoomates';

interface favoritesClientProps {
  listings: SafeListing[];
  roommates: FavoriteRoommate[];
}

const FavoritesClient = ({ listings, roommates }: favoritesClientProps) => {
  const [tab, setTab] = useState<'매물' | '룸메이트'>('매물');
  const [favoritedIds, setFavoritedIds] = useState<string[]>(
    listings.map((l) => l.id),
  );
  const [roommateIds, setRoommateIds] = useState<string[]>(
    roommates.map((r) => r.id),
  );
  const visibleListings = listings.filter((t) => favoritedIds.includes(t.id));
  const visibleRoommates = roommates.filter((r) => roommateIds.includes(r.id));

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
            {t === '매물'
              ? `매물 (${visibleListings.length})`
              : `룸메이트 (${visibleRoommates.length})`}
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

      {tab === '룸메이트' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleRoommates.map((roommate) => (
            <ProfileCard
              key={roommate.id}
              id={roommate.id}
              initial={roommate.users.name?.[0] ?? '?'}
              name={roommate.users.name ?? ''}
              age={0}
              city={roommate.desired_city}
              preference={roommate.preferred_roommate_gender ?? ''}
              minBudget={roommate.budget_min ?? 0}
              maxBudget={roommate.budget_max ?? 0}
              bio={roommate.self_intro ?? ''}
              isLiked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesClient;
