'use client';

import { useState } from 'react';
import { SafeListing } from '@/app/types';
import ListCard from '@/app/listings/lists/ListCard';

const MyListingsClient = ({
  listings,
  favoriteIds,
}: {
  listings: SafeListing[];
  favoriteIds: string[];
}) => {
  const [favoritedIds, setFavoritedIds] = useState<string[]>(favoriteIds);

  const handleFavoriteToggle = (id: string, result: boolean) => {
    if (result) {
      setFavoritedIds((prev) => [...prev, id]);
    } else {
      setFavoritedIds((prev) => prev.filter((fid) => fid !== id));
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      {listings.map((listing) => (
        <ListCard
          key={listing.id}
          listing={listing}
          isSelected={false}
          isFavorited={favoritedIds.includes(listing.id)}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default MyListingsClient;
